# Daily Quiz - Backend Implementation Checklist

## 📋 Overview
This checklist guides the backend team through implementing the Daily Quiz feature. Follow each section in order.

---

## ✅ Phase 1: Project Setup & Database

### Database Design
- [ ] Create `quiz_questions` collection with schema:
  ```javascript
  {
    _id: ObjectId,
    date: Date (today's date),
    courseId: String,
    adminId: String,
    question: String,
    imageUrl: String (optional),
    options: {A: String, B: String, C: String, D: String},
    correctAnswer: String ('A'|'B'|'C'|'D'),
    createdAt: Timestamp,
    updatedAt: Timestamp
  }
  ```

- [ ] Create `quiz_submissions` collection with schema:
  ```javascript
  {
    _id: ObjectId,
    date: Date,
    studentId: String,
    studentName: String,
    questionIds: [String],
    responses: {questionId: answer},
    correctAnswers: Number,
    totalQuestions: Number,
    timeTaken: Number (seconds),
    rank: Number (null until calculated),
    points: Number (null until calculated),
    submittedAt: Timestamp,
    createdAt: Timestamp
  }
  ```

- [ ] Create indexes:
  ```javascript
  db.quiz_questions.createIndex({ date: 1 })
  db.quiz_questions.createIndex({ courseId: 1, date: -1 })
  db.quiz_submissions.createIndex({ date: 1, studentId: 1 }, { unique: true })
  db.quiz_submissions.createIndex({ date: 1 })
  db.quiz_submissions.createIndex({ studentId: 1, date: -1 })
  ```

- [ ] (Optional) Create `quiz_leaderboards` collection for caching:
  ```javascript
  {
    _id: ObjectId,
    date: Date,
    courseId: String,
    totalParticipants: Number,
    rankings: [
      { rank: Number, studentId: String, studentName: String, points: Number }
    ],
    calculatedAt: Timestamp
  }
  ```

### Environment Configuration
- [ ] Set quiz timezone constant:
  ```javascript
  const QUIZ_TIMEZONE = 'UTC'; // or your timezone
  const QUIZ_WINDOW_HOUR = 20; // 8:00 PM in 24-hour format
  const QUIZ_WINDOW_DURATION = 120; // 2 minutes in seconds
  ```

- [ ] Configure image upload storage (S3, GCS, local, etc.)
- [ ] Set rate limiting thresholds for quiz endpoints
- [ ] Set up logging for audit trail

---

## ✅ Phase 2: API Endpoints Implementation

### 2.1 Add Daily Quiz Question
**Endpoint**: `POST /api/quizzes/daily/add-question`

Checklist:
- [ ] Check user is admin
- [ ] Validate request body:
  - [ ] question (string, required, non-empty)
  - [ ] optionA, B, C, D (string, required)
  - [ ] correctAnswer (string, one of A/B/C/D)
  - [ ] image (file, optional)
- [ ] Check current time is not after 8:02 PM (prevent cheating)
- [ ] Upload image if provided:
  - [ ] Validate file type (jpg, png, gif, webp)
  - [ ] Validate file size (max 5MB)
  - [ ] Generate unique filename
  - [ ] Store and return URL
- [ ] Create question document:
  - [ ] Set date to today
  - [ ] Set courseId from auth
  - [ ] Set adminId from user
- [ ] Save to database
- [ ] Return response with:
  - [ ] success: true
  - [ ] questionId
  - [ ] message
  - [ ] totalQuestionsToday
- [ ] Error handling:
  - [ ] Return 401 if not admin
  - [ ] Return 400 if validation fails
  - [ ] Return 400 if after 8:02 PM
  - [ ] Return 500 if DB fails

### 2.2 Get Today's Quiz Questions
**Endpoint**: `GET /api/quizzes/daily/questions`

Checklist:
- [ ] Get all questions for today:
  ```javascript
  db.quiz_questions.find({
    date: new Date().toDateString(),
    courseId: userCourseId
  })
  ```
- [ ] Check current time:
  - [ ] If 8:00-8:02 PM: Include correctAnswer in response
  - [ ] If not in window: Exclude correctAnswer (hide from students)
- [ ] Return response:
  ```javascript
  {
    date: String,
    questions: [...],
    totalQuestions: Number,
    quizLive: Boolean,
    timeRemaining: Number // if quiz active
  }
  ```
- [ ] Error handling:
  - [ ] Return 404 if no questions
  - [ ] Return empty array if appropriate

### 2.3 Submit Quiz Answers
**Endpoint**: `POST /api/quizzes/daily/submit`

Checklist:
- [ ] Authenticate user
- [ ] Validate request body:
  - [ ] studentId matches auth user
  - [ ] date is today
  - [ ] responses object is valid
  - [ ] timeTaken is reasonable (30-120 seconds)
- [ ] Check quiz window (8:00-8:02 PM only):
  - [ ] Return 400 if outside window
- [ ] Check for duplicate submission:
  ```javascript
  existing = db.quiz_submissions.findOne({
    studentId: req.body.studentId,
    date: today
  })
  ```
  - [ ] Return 400 if exists (prevent duplicates)
- [ ] Get today's questions to grade:
  ```javascript
  questions = db.quiz_questions.find({ date: today })
  ```
- [ ] Calculate score:
  ```javascript
  correctCount = 0;
  for each question:
    if responses[questionId] === question.correctAnswer:
      correctCount++;
  ```
- [ ] Create submission:
  ```javascript
  submission = {
    date: today,
    studentId: req.body.studentId,
    studentName: user.name,
    responses: req.body.responses,
    correctAnswers: correctCount,
    totalQuestions: questions.length,
    timeTaken: req.body.timeTaken,
    submittedAt: now,
    rank: null, // Will be calculated later
    points: null // Will be calculated later
  }
  ```
- [ ] Save to database
- [ ] Return response:
  ```javascript
  {
    success: true,
    submissionId: submission._id,
    score: {
      correctAnswers: correctCount,
      totalQuestions: total,
      percentage: (correctCount / total) * 100
    },
    provisionalRank: null // Will be calculated later
  }
  ```
- [ ] Error handling:
  - [ ] 401 if not authenticated
  - [ ] 400 if outside quiz window
  - [ ] 400 if duplicate submission
  - [ ] 400 if invalid data
  - [ ] 500 if DB fails

### 2.4 Get Today's Leaderboard
**Endpoint**: `GET /api/quizzes/daily/leaderboard?date=YYYY-MM-DD`

Checklist:
- [ ] Get date from query params (default to today)
- [ ] Check if quiz window is active:
  - [ ] If 8:00-8:02 PM: Return "quiz in progress" message
  - [ ] If after 8:02 PM: Proceed to fetch rankings
- [ ] Fetch top 3 submissions:
  ```javascript
  submissions = db.quiz_submissions
    .find({ date: date })
    .sort({ rank: 1 })
    .limit(3)
  ```
- [ ] Format response:
  ```javascript
  {
    date: String,
    quizLive: Boolean,
    leaderboard: [
      {
        rank: 1,
        studentId: String,
        studentName: String,
        correctAnswers: Number,
        totalQuestions: Number,
        timeTaken: Number,
        submittedAt: Timestamp,
        bonusPoints: 5/3/1,
        totalPoints: Number,
        badge: String // "🥇 1st Place" etc
      },
      // ... rank 2 and 3
    ],
    totalParticipants: Number
  }
  ```
- [ ] Error handling:
  - [ ] Return empty leaderboard if quiz is active
  - [ ] Return 404 if no submissions yet
  - [ ] Return 500 if DB fails

### 2.5 Get Quiz History
**Endpoint**: `GET /api/quizzes/history?studentId=xxx&limit=10&offset=0`

Checklist:
- [ ] Authenticate user
- [ ] Validate user can only see own history
- [ ] Get submissions:
  ```javascript
  submissions = db.quiz_submissions
    .find({ studentId: studentId })
    .sort({ date: -1 })
    .limit(limit)
    .skip(offset)
  ```
- [ ] For each submission, fetch questions:
  ```javascript
  questions = db.quiz_questions.find({
    _id: { $in: submission.questionIds }
  })
  ```
- [ ] Build detailed response:
  ```javascript
  {
    studentId: String,
    totalQuizzes: Number,
    quizzes: [
      {
        id: String,
        date: Date,
        questions: [
          {
            questionId: String,
            question: String,
            image: URL,
            options: {A, B, C, D},
            studentAnswer: String,
            correctAnswer: String,
            isCorrect: Boolean
          }
        ],
        score: {
          correctAnswers: Number,
          totalQuestions: Number,
          percentage: Number
        },
        timeTaken: Number,
        rank: Number,
        points: Number,
        submittedAt: Timestamp
      }
    ]
  }
  ```
- [ ] Error handling:
  - [ ] 401 if not authenticated
  - [ ] 403 if accessing other user's data
  - [ ] 404 if no history found
  - [ ] 500 if DB fails

---

## ✅ Phase 3: Core Business Logic

### Quiz Window Validation
```javascript
function isQuizWindowActive() {
  const now = new Date();
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  return hours === QUIZ_WINDOW_HOUR && minutes < 2;
}

// Use in: Add Question, Submit, and Get Questions endpoints
```

- [ ] Implement and test

### Ranking Calculation
Create cron job that runs at 8:03 PM:

```javascript
async function calculateDailyRankings(date) {
  // 1. Get all submissions for the day
  const submissions = await db.quiz_submissions
    .find({ date: date })
    .sort({ 
      correctAnswers: -1,    // Most correct first
      timeTaken: 1           // Fastest first
    })
    .toArray();

  // 2. Assign ranks and points
  for (let i = 0; i < submissions.length; i++) {
    const rank = i + 1;
    const bonusPoints = [5, 3, 1][rank - 1] || 0;
    const totalPoints = submissions[i].correctAnswers + bonusPoints;

    // 3. Update submission
    await db.quiz_submissions.updateOne(
      { _id: submissions[i]._id },
      {
        $set: {
          rank: rank,
          points: totalPoints,
          rankingCalculated: true,
          calculatedAt: new Date()
        }
      }
    );
  }

  // 4. (Optional) Cache in leaderboard collection
  await db.quiz_leaderboards.insertOne({
    date: date,
    totalParticipants: submissions.length,
    rankings: submissions.slice(0, 3).map((sub, i) => ({
      rank: i + 1,
      studentId: sub.studentId,
      studentName: sub.studentName,
      points: sub.points
    })),
    calculatedAt: new Date()
  });
}
```

Checklist:
- [ ] Set up cron job for 8:03 PM daily
- [ ] Test ranking calculation logic
- [ ] Test with various score scenarios
- [ ] Verify database updates correctly
- [ ] Log calculation for audit trail

### Duplicate Submission Prevention
- [ ] Index: `db.quiz_submissions.createIndex({ studentId: 1, date: 1 }, { unique: true })`
- [ ] Check before insert:
  ```javascript
  existing = db.quiz_submissions.findOne({
    studentId: studentId,
    date: today
  });
  if (existing) {
    return { error: 'Duplicate submission' };
  }
  ```
- [ ] Test: Try submitting twice, should get error on 2nd

### Correct Answer Protection
- [ ] During quiz (8:00-8:02 PM):
  - [ ] Remove `correctAnswer` from GET questions response
  - [ ] Log any attempt to access answers
- [ ] After quiz (8:02 PM+):
  - [ ] Include `correctAnswer` in GET questions response
  - [ ] Include answers in history responses
- [ ] Test:
  - [ ] Query at 8:01 PM → no correct answers
  - [ ] Query at 8:03 PM → correct answers visible

---

## ✅ Phase 4: Security & Validation

### Input Validation
- [ ] Sanitize all string inputs (prevent XSS)
- [ ] Validate file uploads:
  - [ ] Check MIME type
  - [ ] Check file size (max 5MB)
  - [ ] Scan for malware (optional)
- [ ] Validate timeTaken:
  - [ ] Must be between 10-120 seconds
  - [ ] Must not exceed quiz window
- [ ] Validate answers:
  - [ ] Must be one of A, B, C, D
  - [ ] Check against actual questions

### Authorization
- [ ] Admin check for add-question endpoint
- [ ] User check for submit endpoint
- [ ] Owner check for history endpoint
- [ ] Implement role-based access control

### Rate Limiting
```javascript
// Limit question additions
rateLimitAddQuestion: 100 requests per hour per admin

// Limit submissions
rateLimitSubmit: 1 request per student per day

// Limit API reads
rateLimitRead: 1000 requests per hour per user
```

- [ ] Implement rate limiting middleware
- [ ] Return 429 when limit exceeded

### Logging & Audit
- [ ] Log all quiz submissions with:
  - [ ] Student ID
  - [ ] Timestamp
  - [ ] Score
  - [ ] IP address
- [ ] Log admin question additions
- [ ] Log ranking calculations
- [ ] Set retention policy (keep 1 year)

---

## ✅ Phase 5: Testing

### Unit Tests
- [ ] `isQuizWindowActive()` - Various times
- [ ] Score calculation - Multiple scenarios
- [ ] Ranking algorithm - Edge cases
- [ ] Duplicate detection - Same student twice
- [ ] Input validation - Invalid data

### Integration Tests
- [ ] Add question → appears in GET
- [ ] Submit during quiz → accepted
- [ ] Submit outside quiz → rejected
- [ ] Duplicate submission → rejected
- [ ] Ranking calculated correctly
- [ ] Leaderboard populated

### Load Testing
- [ ] Simulate 100 concurrent submissions at 8:01 PM
- [ ] Check all submissions processed
- [ ] Check database performance
- [ ] Check API response times (should be <200ms)

### Security Testing
- [ ] Try accessing other user's history (should fail)
- [ ] Try submitting with forged data (should fail)
- [ ] Try accessing answers during quiz (should fail)
- [ ] Try uploading malware (should fail)
- [ ] Try SQL injection (should fail)

### Edge Cases
- [ ] What if 0 questions added? (return error)
- [ ] What if student doesn't answer all? (calculate from answered)
- [ ] What if submission takes >120 seconds? (reject)
- [ ] What if clock changes (daylight saving)? (handle gracefully)
- [ ] What if same score, same time for rank 1 & 2? (use submission order)

---

## ✅ Phase 6: Integration with Frontend

### Verify API Contract
- [ ] Response format matches frontend expectations
- [ ] Error messages are user-friendly
- [ ] Status codes are correct (200, 400, 401, 404, 500)
- [ ] Timestamps in ISO format (JSON serializable)

### Update Frontend Endpoints
- [ ] Line 75 in QuizScreen.jsx: Add question submission
- [ ] Line 241 in QuizScreen.jsx: Submit quiz answers
- [ ] Add leaderboard polling (fetch every 5 seconds after 8:02 PM)
- [ ] Add history loading (on component mount)

### Testing Integration
- [ ] Admin adds question via frontend → Backend stores → GET retrieves
- [ ] Student submits quiz → Backend validates → Frontend shows score
- [ ] Leaderboard updates after 8:02 PM
- [ ] History displays correctly

---

## ✅ Phase 7: Deployment & Monitoring

### Pre-Deployment
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Database migrations tested
- [ ] Cron jobs configured
- [ ] Environment variables set
- [ ] Error monitoring set up (Sentry, etc.)

### Deployment Steps
- [ ] Deploy to staging
- [ ] Run full test suite
- [ ] Verify all endpoints
- [ ] Check database
- [ ] Deploy to production
- [ ] Monitor logs for errors

### Post-Deployment
- [ ] Set up alerts for quiz endpoint errors
- [ ] Monitor ranking calculation job
- [ ] Track API response times
- [ ] Monitor database queries
- [ ] Check for security issues

### Monitoring Metrics
- [ ] Questions added per day
- [ ] Submissions per day
- [ ] Average score
- [ ] API latency
- [ ] Error rate
- [ ] Database connection pool usage

---

## 📊 Testing Scenarios

### Scenario 1: Normal Flow
```
7:00 PM - Admin adds 3 questions
8:00 PM - Student starts quiz
8:00:30 - Student answers Q1
8:00:45 - Student answers Q2
8:01:15 - Student answers Q3
8:01:30 - Student clicks Finish
✓ Score: 2/3
✓ Saved to history
✓ Leaderboard pending

8:03 PM - Ranking calculated
✓ Student see leaderboard
✓ Points awarded
```

### Scenario 2: Late Submission
```
7:59 PM - Student not online
8:01:45 - Student starts quiz (only 15 seconds left)
8:02:00 - Submission deadline reached
✗ Quiz auto-finishes
✗ Answers only submitted up to Q1
✓ Score calculated for answered Q's
```

### Scenario 3: Duplicate Prevention
```
8:00:30 - Student submits quiz (Score: 2/3)
8:00:45 - Student tries submitting again
✗ API returns: "Duplicate submission"
✗ 2nd submission rejected
✓ Only 1st submission recorded
```

---

## 📝 Completion Checklist

### Backend Infrastructure
- [ ] Database collections created
- [ ] Indexes created
- [ ] Environment configured
- [ ] Logging configured
- [ ] Error handling configured

### API Endpoints (5 total)
- [ ] 1. Add Question - Working
- [ ] 2. Get Questions - Working
- [ ] 3. Submit Answers - Working
- [ ] 4. Get Leaderboard - Working
- [ ] 5. Get History - Working

### Business Logic
- [ ] Quiz window validation - Working
- [ ] Score calculation - Working
- [ ] Ranking calculation - Working
- [ ] Duplicate prevention - Working
- [ ] Answer protection - Working

### Security
- [ ] Input validation - Implemented
- [ ] Authorization checks - Implemented
- [ ] Rate limiting - Implemented
- [ ] Logging & audit - Implemented

### Testing
- [ ] Unit tests - Passing
- [ ] Integration tests - Passing
- [ ] Load tests - Passing
- [ ] Security tests - Passing
- [ ] Edge cases - Handled

### Documentation
- [ ] API documented
- [ ] Database schema documented
- [ ] Cron jobs documented
- [ ] Error codes documented

### Integration
- [ ] Frontend connected - Working
- [ ] End-to-end working - Verified
- [ ] Performance acceptable - Confirmed

---

## 🚀 Go-Live Checklist

- [ ] All checklist items above complete
- [ ] Staging environment tested
- [ ] Production deployment tested
- [ ] Monitoring & alerts active
- [ ] Backup procedure documented
- [ ] Rollback procedure documented
- [ ] Team trained on system
- [ ] Documentation accessible to team

---

## 📞 Support & Questions

If unclear on any requirements:
1. Review `BACKEND_API_TEMPLATE.js` for detailed specs
2. Review `DAILY_QUIZ_IMPLEMENTATION.md` for architecture
3. Review `FLOW_DIAGRAMS.md` for visual flows
4. Check `QUICK_REFERENCE.md` for quick answers

---

**Last Updated**: January 25, 2026  
**Status**: Ready for Backend Implementation  
**Next Steps**: Follow checklist items above in order
