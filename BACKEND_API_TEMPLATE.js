/**
 * DAILY QUIZ API INTEGRATION TEMPLATE
 * 
 * Use this as a reference for implementing the backend endpoints
 * for the Daily Quiz feature in the PAINLESS LMS Portal
 */

// ============================================================
// 1. ADD DAILY QUIZ QUESTION (Admin Only)
// ============================================================
// POST /api/quizzes/daily/add-question

/**
Request Format:
{
  question: "What is React?",
  image: File (optional),
  optionA: "A library for building UIs",
  optionB: "A programming language",
  optionC: "A database",
  optionD: "A server framework",
  correctAnswer: "A"
}

Response:
{
  success: true,
  message: "Question added successfully",
  questionId: "q_uuid_1234",
  date: "2026-01-25",
  totalQuestionsToday: 2
}

Error Response:
{
  success: false,
  error: "Only during quiz window (8:00-8:02 PM)"
}
*/

// ============================================================
// 2. GET TODAY'S QUIZ QUESTIONS
// ============================================================
// GET /api/quizzes/daily/questions

/**
Response (BEFORE 8:02 PM):
{
  date: "2026-01-25",
  questions: [
    {
      id: "q_uuid_1",
      question: "What is React?",
      image: "https://cdn.example.com/image.png",
      options: {
        A: "A library for building UIs",
        B: "A programming language",
        C: "A database",
        D: "A server framework"
      }
      // NOTE: correctAnswer is NOT included during quiz window
    },
    // ... more questions
  ],
  totalQuestions: 3,
  quizLive: true,
  timeRemaining: 45 // seconds
}

Response (AFTER 8:02 PM):
{
  date: "2026-01-25",
  questions: [
    {
      id: "q_uuid_1",
      question: "What is React?",
      image: "https://cdn.example.com/image.png",
      options: {
        A: "A library for building UIs",
        B: "A programming language",
        C: "A database",
        D: "A server framework"
      },
      correctAnswer: "A" // Now visible after quiz ends
    },
    // ... more questions
  ],
  totalQuestions: 3,
  quizLive: false,
  leaderboardReady: true
}
*/

// ============================================================
// 3. SUBMIT QUIZ ANSWERS
// ============================================================
// POST /api/quizzes/daily/submit

/**
Request Format:
{
  studentId: "student_uuid_123",
  studentName: "John Doe",
  date: "2026-01-25",
  responses: {
    "q_uuid_1": "A",
    "q_uuid_2": "B",
    "q_uuid_3": "C"
  },
  timeTaken: 45, // seconds
  submittedAt: "2026-01-25T20:01:30.000Z"
}

Response (Submission Successful):
{
  success: true,
  message: "Quiz submitted successfully",
  submissionId: "sub_uuid_456",
  score: {
    correctAnswers: 2,
    totalQuestions: 3,
    percentage: 67
  },
  provisionalRank: 2 // Rank will be finalized after window closes
}

Error Responses:
{
  success: false,
  error: "Quiz window has closed (ends at 8:02 PM)",
  quizLive: false
}

{
  success: false,
  error: "Duplicate submission detected",
  existingSubmissionId: "sub_uuid_789"
}

{
  success: false,
  error: "Student not authenticated"
}
*/

// ============================================================
// 4. GET TODAY'S LEADERBOARD
// ============================================================
// GET /api/quizzes/daily/leaderboard?date=2026-01-25

/**
Response (DURING Quiz - 8:00-8:02 PM):
{
  date: "2026-01-25",
  quizLive: true,
  leaderboard: [
    // Empty until quiz ends
  ],
  message: "Leaderboard will be available after quiz ends"
}

Response (AFTER Quiz - 8:02 PM+):
{
  date: "2026-01-25",
  quizLive: false,
  leaderboard: [
    {
      rank: 1,
      studentId: "student_uuid_001",
      studentName: "Alice Johnson",
      correctAnswers: 3,
      totalQuestions: 3,
      timeTaken: 45,
      submittedAt: "2026-01-25T20:00:45.000Z",
      bonusPoints: 5,
      totalPoints: 8, // 5 bonus + 3 correct
      badge: "🥇 1st Place"
    },
    {
      rank: 2,
      studentId: "student_uuid_002",
      studentName: "Bob Smith",
      correctAnswers: 3,
      totalQuestions: 3,
      timeTaken: 67,
      submittedAt: "2026-01-25T20:01:07.000Z",
      bonusPoints: 3,
      totalPoints: 6,
      badge: "🥈 2nd Place"
    },
    {
      rank: 3,
      studentId: "student_uuid_003",
      studentName: "Carol Davis",
      correctAnswers: 2,
      totalQuestions: 3,
      timeTaken: 50,
      submittedAt: "2026-01-25T20:00:50.000Z",
      bonusPoints: 1,
      totalPoints: 3,
      badge: "🥉 3rd Place"
    }
  ],
  totalParticipants: 47,
  calculatedAt: "2026-01-25T20:02:01.000Z"
}
*/

// ============================================================
// 5. GET QUIZ HISTORY (Past Quizzes)
// ============================================================
// GET /api/quizzes/history?studentId=student_uuid_123&limit=10&offset=0

/**
Response:
{
  studentId: "student_uuid_123",
  totalQuizzes: 5,
  quizzes: [
    {
      id: "sub_uuid_789",
      date: "2026-01-25",
      questions: [
        {
          questionId: "q_uuid_1",
          question: "What is React?",
          image: "https://cdn.example.com/image.png",
          options: {
            A: "A library for building UIs",
            B: "A programming language",
            C: "A database",
            D: "A server framework"
          },
          studentAnswer: "A",
          correctAnswer: "A",
          isCorrect: true
        },
        {
          questionId: "q_uuid_2",
          question: "What is JSX?",
          image: null,
          options: {
            A: "Java Server XML",
            B: "JavaScript XML",
            C: "Java Syntax Extension",
            D: "JavaScript eXtended"
          },
          studentAnswer: "A",
          correctAnswer: "B",
          isCorrect: false
        }
      ],
      score: {
        correctAnswers: 2,
        totalQuestions: 3,
        percentage: 67
      },
      timeTaken: 45,
      rank: 2,
      points: 6,
      bonusPoints: 3,
      submittedAt: "2026-01-25T20:01:30.000Z"
    },
    // ... more past quizzes
  ]
}
*/

// ============================================================
// IMPORTANT BACKEND LOGIC REQUIREMENTS
// ============================================================

/**
TIMEZONE & TIME WINDOW
- Quiz is available: 8:00 PM - 8:02 PM (120 seconds)
- Must be in a consistent timezone (UTC or your configured timezone)
- Check server time, not client time (prevent cheating)

RANKING ALGORITHM (After 8:02 PM closes)
1. Sort all submissions by:
   - Primary: correctAnswers DESC (most correct first)
   - Secondary: timeTaken ASC (fastest first)
2. Assign ranks:
   - Rank 1-3: Get bonus points + correct answers
   - Rank 4+: Get 0 bonus + correct answers

SECURITY REQUIREMENTS
1. Authenticate user before accepting submission
2. Validate all answers server-side
3. Don't expose correctAnswer during quiz window
4. Prevent duplicate submissions per student per day
5. Validate timeTaken is within realistic range
6. Check submittedAt is within quiz window
7. Store all submissions for audit trail

DATABASE INDEXES
- Create index on (date, studentId) for quick lookups
- Create index on (date) for leaderboard queries
- Create index on (studentId, date DESC) for history

RATE LIMITING
- Limit question additions to admin users only
- Max 1 submission per student per quiz
- Throttle leaderboard requests

ERROR SCENARIOS
1. Duplicate submission → Return existing submission ID
2. Late submission → Reject, return "Quiz ended"
3. Missing fields → Validate and return field errors
4. Network timeout → Implement idempotency keys
5. Concurrent ranking → Use database locks
*/

// ============================================================
// SAMPLE IMPLEMENTATION FLOW (Node.js + Express)
// ============================================================

/**
Example with Node.js/Express:

// 1. Check quiz window
const isQuizWindow = () => {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  return hours === 20 && minutes < 2;
};

// 2. Submit answer endpoint
app.post('/api/quizzes/daily/submit', authenticateUser, async (req, res) => {
  if (!isQuizWindow()) {
    return res.status(400).json({ 
      error: "Quiz window has closed" 
    });
  }

  const { studentId, responses, timeTaken } = req.body;
  
  // Check for duplicate
  const existing = await Submission.findOne({ 
    studentId, 
    date: new Date().toISOString().split('T')[0]
  });
  
  if (existing) {
    return res.status(400).json({ 
      error: "Duplicate submission",
      existingId: existing._id 
    });
  }

  // Calculate score
  const questions = await Question.find({ 
    date: new Date().toISOString().split('T')[0]
  });
  
  let correctCount = 0;
  Object.entries(responses).forEach(([qId, answer]) => {
    const question = questions.find(q => q._id.toString() === qId);
    if (question && question.correctAnswer === answer) {
      correctCount++;
    }
  });

  // Save submission
  const submission = new Submission({
    studentId,
    responses,
    timeTaken,
    correctAnswers: correctCount,
    totalQuestions: questions.length
  });

  await submission.save();
  
  res.json({ 
    success: true,
    submissionId: submission._id,
    score: {
      correctAnswers: correctCount,
      totalQuestions: questions.length
    }
  });
});

// 3. Calculate rankings (run after 8:02 PM via cron job)
const calculateDailyRankings = async () => {
  const today = new Date().toISOString().split('T')[0];
  const submissions = await Submission.find({ date: today })
    .sort({ correctAnswers: -1, timeTaken: 1 });

  submissions.forEach(async (sub, index) => {
    const rank = index + 1;
    const bonusPoints = [5, 3, 1][rank - 1] || 0;
    
    await Submission.updateOne(
      { _id: sub._id },
      { 
        rank,
        points: sub.correctAnswers + bonusPoints,
        rankingCalculated: true
      }
    );
  });
};

// Run this via cron job at 8:03 PM daily
// Example: node-cron or similar scheduler
*/

// ============================================================
// FRONTEND INTEGRATION POINTS
// ============================================================

/**
In QuizScreen.jsx, replace these TODO comments with API calls:

1. Line 75 - handleSubmitQuestion:
   Replace: console.log('Question submitted:', formData);
   With: 
   ```
   const formDataToSend = new FormData();
   formDataToSend.append('question', formData.question);
   formDataToSend.append('image', formData.image);
   formDataToSend.append('optionA', formData.optionA);
   // ... etc
   
   const response = await fetch('/api/quizzes/daily/add-question', {
     method: 'POST',
     body: formDataToSend,
     headers: { 'Authorization': `Bearer ${authToken}` }
   });
   const data = await response.json();
   // Handle response
   ```

2. Line 241 - handleFinishQuiz:
   Replace: // TODO: Send to backend API
   With:
   ```
   const response = await fetch('/api/quizzes/daily/submit', {
     method: 'POST',
     headers: { 
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${authToken}`
     },
     body: JSON.stringify({
       studentId: user.id,
       studentName: user.name,
       date: today,
       responses: quizResponses,
       timeTaken: timeTaken,
       submittedAt: new Date()
     })
   });
   // Handle response
   ```

3. Load today's leaderboard after quiz window closes:
   ```
   const loadLeaderboard = async () => {
     const response = await fetch(
       `/api/quizzes/daily/leaderboard?date=${today}`
     );
     const data = await response.json();
     setTodaysLeaderboard(data.leaderboard);
   };
   ```

4. Load quiz history:
   ```
   const loadQuizHistory = async () => {
     const response = await fetch(
       `/api/quizzes/history?studentId=${user.id}`
     );
     const data = await response.json();
     setQuizHistory(data.quizzes);
   };
   ```
*/

// ============================================================
// END OF TEMPLATE
// ============================================================
