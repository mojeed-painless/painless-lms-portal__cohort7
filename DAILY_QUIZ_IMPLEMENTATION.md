# Daily Quiz Implementation Guide

## Frontend Implementation Complete ✅

The complete daily quiz logic has been implemented in `src/pages/QuizScreen.jsx`. This document outlines:
1. What the frontend handles
2. Backend API recommendations
3. Data flow and state management
4. Features implemented

---

## Frontend Features Implemented

### 1. **Quiz Question Management (Admin Panel)**
- **File**: `src/pages/QuizScreen.jsx`
- **State**: `todaysQuestions` array
- Admins can add 1, 2, 3+ questions for the daily quiz
- Questions stored with timestamp (today's date)
- Support for question images
- Form validation before submission
- Real-time preview of added questions

### 2. **Countdown Timer System**
- **Countdown to Next Quiz**: Shows time until 8:00 PM (20:00)
- **Live Quiz Window**: When it's 8:00-8:02 PM, shows 2-minute countdown
- **Quiz Session Timer**: 2-minute countdown during active quiz
- Automatic detection of live window
- Resets daily

### 3. **Quiz Session Flow**
- **Start Quiz**: Button appears during 8:00-8:02 PM window
- **Question Navigation**: Previous/Next buttons to move between questions
- **Option Selection**: Click to select answers
- **Finish Button**: Appears on last question
- **Auto-Finish**: If 2 minutes expire or 8:02 PM is reached, quiz auto-finishes

### 4. **Score Calculation**
```javascript
Score = Correct Answers (out of total questions)
Time Taken = Submission time in seconds
```

### 5. **Leaderboard (Today's Top 3)**
Displays top 3 performers ranked by:
1. Number of correct answers (DESC)
2. Time taken to submit (ASC)

Points awarded:
- **1st Place**: 5 bonus points + correct answers
- **2nd Place**: 3 bonus points + correct answers
- **3rd Place**: 1 bonus point + correct answers
- **Others**: 0 bonus points + correct answers

### 6. **Previous Quizzes History**
- Stores all past quiz submissions
- Expandable/collapsible by date
- Shows:
  - Date of quiz
  - Score (correct/total)
  - Each question with user's answer
  - Correct answer comparison
  - Visual indicators (✓ Correct, ✗ Incorrect)
  - Images if present in original question

### 7. **State Management**
```javascript
// Daily quiz data
- todaysQuestions: Array of question objects
- quizHistory: Array of past submissions
- todaysLeaderboard: Top 3 student submissions

// Current session
- quizStarted: Boolean
- currentQuestionIndex: Number
- quizResponses: Object { questionIndex: selectedOption }
- quizStartTime: Timestamp

// UI State
- isLiveQuiz: Boolean
- quizSessionTime: { minutes, seconds }
- successMessage: String for feedback
```

---

## Backend API Recommendations

### **Required Endpoints**

#### 1. **Add Daily Quiz Question**
```
POST /api/quizzes/daily/add-question
Content-Type: multipart/form-data

Request Body:
{
  question: string,
  image: file (optional),
  optionA: string,
  optionB: string,
  optionC: string,
  optionD: string,
  correctAnswer: 'A' | 'B' | 'C' | 'D'
}

Response:
{
  success: boolean,
  message: string,
  questionId: string,
  date: string (YYYY-MM-DD)
}

Storage: Save with today's date. Only available during 8:00-8:02 PM window
```

#### 2. **Get Today's Quiz Questions**
```
GET /api/quizzes/daily/questions

Response:
{
  date: string (YYYY-MM-DD),
  questions: [
    {
      id: string,
      question: string,
      image: URL (optional),
      options: {
        A: string,
        B: string,
        C: string,
        D: string
      },
      correctAnswer: string (only after quiz window closes)
    }
  ],
  totalQuestions: number
}

Note: Only send correctAnswer after 8:02 PM closes
```

#### 3. **Submit Quiz Answers**
```
POST /api/quizzes/daily/submit
Content-Type: application/json

Request Body:
{
  studentId: string,
  studentName: string,
  date: string (YYYY-MM-DD),
  responses: {
    0: 'A',
    1: 'B',
    2: 'C'
  },
  timeTaken: number (seconds),
  submittedAt: timestamp
}

Response:
{
  success: boolean,
  message: string,
  score: {
    correctAnswers: number,
    totalQuestions: number,
    percentage: number
  },
  submission: {
    id: string,
    studentRank: number (rank after quiz window closes),
    points: number
  }
}

Critical: 
- Store submission immediately
- Lock answers after 8:02 PM
- Calculate ranking only after quiz window closes
```

#### 4. **Get Today's Leaderboard**
```
GET /api/quizzes/daily/leaderboard?date=YYYY-MM-DD

Response:
{
  date: string,
  leaderboard: [
    {
      rank: number (1, 2, 3),
      studentId: string,
      studentName: string,
      correctAnswers: number,
      totalQuestions: number,
      timeTaken: number,
      bonusPoints: number (5, 3, or 1),
      totalPoints: number (bonus + correct),
      submittedAt: timestamp
    }
  ]
}

Note: Only populated after 8:02 PM when quiz window closes
```

#### 5. **Get Quiz History**
```
GET /api/quizzes/history?studentId=xxx&limit=20&offset=0

Response:
{
  quizzes: [
    {
      id: string,
      date: string (YYYY-MM-DD),
      studentId: string,
      questions: [
        {
          questionId: string,
          question: string,
          image: URL (optional),
          options: {A, B, C, D},
          studentAnswer: 'A',
          correctAnswer: 'B',
          isCorrect: boolean
        }
      ],
      score: {
        correctAnswers: number,
        totalQuestions: number,
        percentage: number
      },
      timeTaken: number (seconds),
      rank: number,
      points: number,
      submittedAt: timestamp
    }
  ],
  total: number
}
```

---

## Data Model Recommendations

### **Quiz Questions Collection**
```javascript
{
  _id: ObjectId,
  date: Date (today's date),
  courseId: string,
  adminId: string,
  question: string,
  imageUrl: string (optional),
  options: {
    A: string,
    B: string,
    C: string,
    D: string
  },
  correctAnswer: 'A' | 'B' | 'C' | 'D',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### **Quiz Submissions Collection**
```javascript
{
  _id: ObjectId,
  date: Date (quiz date),
  studentId: string,
  studentName: string,
  questionIds: [string],
  responses: {
    questionId: selectedOption
  },
  correctAnswers: number,
  totalQuestions: number,
  timeTaken: number (seconds),
  rank: number (1, 2, 3, or 4+, calculated after window closes),
  points: number (bonus + correct, calculated after window closes),
  submittedAt: timestamp,
  createdAt: timestamp
}
```

### **Daily Leaderboard Collection** (Optional - for caching)
```javascript
{
  _id: ObjectId,
  date: Date,
  courseId: string,
  submissions: [submissionIds],
  totalParticipants: number,
  rankings: [
    {
      rank: number,
      studentId: string,
      studentName: string,
      points: number
    }
  ],
  calculatedAt: timestamp
}
```

---

## Critical Backend Logic

### **1. Quiz Window Enforcement** (8:00 PM - 8:02 PM UTC or your timezone)
```javascript
// Only accept new submissions during this window
const now = new Date().getHours();
const minutes = new Date().getMinutes();
const isQuizTime = now === 20 && minutes < 2; // 8:00-8:01:59 PM

if (!isQuizTime) {
  return { error: "Quiz is not live right now" };
}
```

### **2. Ranking Calculation** (After 8:02 PM)
```javascript
// Sort submissions by:
// 1. Correct answers (DESC)
// 2. Time taken (ASC)
const submissions = db.quizSubmissions
  .find({ date: today })
  .sort({ 
    correctAnswers: -1, 
    timeTaken: 1 
  })
  .toArray();

// Assign ranks and points
submissions.forEach((sub, index) => {
  const rank = index + 1;
  const bonusPoints = [5, 3, 1][rank - 1] || 0;
  const totalPoints = sub.correctAnswers + bonusPoints;
  
  db.quizSubmissions.updateOne(
    { _id: sub._id },
    { 
      $set: { 
        rank: rank,
        points: totalPoints,
        calculated: true 
      }
    }
  );
});
```

### **3. Lock Correct Answers**
```javascript
// Don't send correctAnswer to frontend until quiz window closes
if (isQuizTime) {
  // Remove correctAnswer from response
  questions.forEach(q => delete q.correctAnswer);
}

// After 8:02 PM, safe to reveal answers
```

---

## Frontend-Backend Integration Checklist

- [ ] API endpoints created and tested
- [ ] Quiz window timezone matches production
- [ ] Leaderboard calculated after window closes
- [ ] Correct answers not exposed during quiz
- [ ] Database indexes on (date, studentId) for queries
- [ ] Error handling for failed submissions
- [ ] Duplicate submission prevention
- [ ] Image upload and storage configured
- [ ] User authentication verified on endpoints
- [ ] Rate limiting on API endpoints
- [ ] Logging for quiz submissions

---

## Frontend Code Comments (API Integration Points)

Search for these comments in `QuizScreen.jsx` to add API calls:

1. **Line ~75**: `// TODO: Send to backend API - Add Question`
2. **Line ~241**: `// TODO: Send to backend API - Submit Quiz`

Replace `alert()` and `console.log()` with actual API calls using:
- `fetch()` API
- `axios`
- `react-query`
- Or your preferred HTTP client

---

## Testing Checklist

**Frontend Only** (Current):
- ✅ Form validation
- ✅ Question storage in state
- ✅ Countdown timers
- ✅ Quiz session flow
- ✅ Option selection
- ✅ Score calculation
- ✅ Leaderboard ranking
- ✅ History display

**Integration Testing** (With Backend):
- [ ] Add question success/error handling
- [ ] Submission success/error handling
- [ ] Timezone handling
- [ ] Concurrent submissions
- [ ] Network errors
- [ ] Slow submissions (near deadline)

---

## Future Enhancements

1. **Streak System**: Track consecutive days completed
2. **Achievements**: Badges for milestones (10 correct, top 10, etc.)
3. **Weekly Leaderboard**: Track performance over 7 days
4. **Difficulty Levels**: Easy, Medium, Hard questions
5. **Category Filtering**: Quiz by topic
6. **Performance Analytics**: Personal stats dashboard
7. **Notifications**: Alerts before/during quiz time
8. **Share Results**: Share quiz performance on social

---

## Notes for Backend Team

- This is a **real-time competitive** system - timing matters!
- **Security**: Validate all submissions server-side
- **Timezone**: Ensure all times are in consistent UTC or configured timezone
- **Race Conditions**: Handle simultaneous submissions carefully
- **Database Indexes**: Add indexes on frequently queried fields
- **Caching**: Consider caching leaderboard for performance
- **Scalability**: Design for thousands of daily submissions

---

**Last Updated**: January 25, 2026
**Status**: Ready for Backend Integration
