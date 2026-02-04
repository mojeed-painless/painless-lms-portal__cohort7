# Daily Quiz - Quick Reference Guide

## 🎯 Feature Overview

**When**: Daily at 8:00-8:02 PM (2-minute window)  
**Who**: All students (questions added by admins)  
**What**: Multiple-choice quiz with leaderboard ranking  
**Where**: Quiz Center → Daily Quiz tab

---

## 📋 Admin Tasks

| Task | How | When |
|------|-----|------|
| Add Questions | Quiz Center → Add Question tab → Fill form → Submit | Anytime before 8 PM |
| Max Questions | 1 to unlimited | Daily reset |
| Question Types | Multiple choice (A, B, C, D) | Always |
| Images | Optional per question | During setup |
| Edit Questions | Currently not available (add new only) | Before quiz starts |

---

## 👨‍🎓 Student Tasks

| Phase | Time | What Happens | User Action |
|-------|------|--------------|-------------|
| **Waiting** | Before 8 PM | Countdown to next quiz | Check progress, view history |
| **Live** | 8:00-8:02 PM | Quiz window open, "Start Quiz" button shows | Click "Start Quiz" |
| **Active** | During 2 min | Answer questions, timer counts down | Answer all questions |
| **Submit** | During 2 min | "Finish" button on last question | Click "Finish" |
| **Results** | After 2 min | Leaderboard & history updated | Check ranking |

---

## 🏆 Scoring System

```
Your Score = Correct Answers out of Total Questions

Bonus Points (1st Place):  +5 pts
Bonus Points (2nd Place):  +3 pts  
Bonus Points (3rd Place):  +1 pt
Bonus Points (Others):     0 pts

Total Points = Bonus + Correct Answers
```

**Ranking**: By correct answers, then by speed (time taken)

---

## 🔢 State Variables

```javascript
// Question management
todaysQuestions: []         // Questions for today
formData: {}                // Admin form data

// Session tracking  
quizStarted: false          // Is quiz in progress?
currentQuestionIndex: 0     // Which question (0-indexed)
quizResponses: {}           // Student answers { 0: 'A', 1: 'B' }
quizStartTime: null         // When did quiz start?

// UI states
isLiveQuiz: false           // Is 8-8:02 PM window open?
quizSessionTime: {2, 0}     // Countdown timer
todaysLeaderboard: []       // Top 3 today
quizHistory: []             // All past submissions
successMessage: ""          // Feedback notifications
```

---

## ⏱️ Timer Logic

### Main Countdown (to 8:00 PM)
```javascript
useEffect(() => {
  // Runs every 1 second
  // Calculates time until 8:00 PM
  // Sets isLiveQuiz = true when 8:00-8:02 PM
})
```

### Quiz Session Countdown (2 minutes)
```javascript
useEffect(() => {
  // Runs only when quizStarted = true
  // Counts down from 2:00 to 0:00
  // Stops at 0:00
})
```

### End-of-Window Check
```javascript
useEffect(() => {
  // When isLiveQuiz becomes false (8:02 PM reached)
  // Auto-finishes any active quiz
})
```

---

## 📊 Data Flow

### Adding a Question
```
Admin Form 
  ↓
Validate inputs
  ↓
Create question object
  ↓
Add to todaysQuestions array
  ↓
Show success message
  ↓
Reset form
  ↓
[Backend API Call - TODO]
```

### Taking a Quiz
```
Student clicks "Start Quiz" (8:00-8:02 PM only)
  ↓
quizStarted = true
  ↓
Show first question
  ↓
Student selects answers (quizResponses[index] = answer)
  ↓
Student clicks Next/Previous
  ↓
Student clicks Finish on last question
  ↓
calculateScore()
  ↓
Send to backend [TODO]
  ↓
Save to quizHistory
  ↓
Update todaysLeaderboard
  ↓
Show success message
  ↓
quizStarted = false
```

### Viewing Results
```
Quiz Leaderboard
  ↓
Shows Top 3 with:
  - Rank (1, 2, 3)
  - Student name
  - Score (correct/total)
  - Time taken
  - Points earned

Previous Quizzes
  ↓
Expandable list by date
  ↓
Shows all questions + student answers
  ↓
Visual feedback (✓ correct, ✗ incorrect)
```

---

## 🔑 Key Functions

### `handleSubmitQuestion(e)`
- Validates form inputs
- Creates question object with timestamp
- Adds to `todaysQuestions`
- Resets form
- Shows success message

### `handleStartQuiz()`
- Validates questions exist
- Sets `quizStarted = true`
- Initializes session timer
- Records `quizStartTime`

### `handleSelectOption(optionKey)`
- Stores answer in `quizResponses[currentQuestionIndex]`
- Visually highlights selected option

### `handleFinishQuiz()`
- Calculates score using `calculateScore()`
- Records `timeTaken`
- Creates submission object
- Adds to `quizHistory`
- Updates leaderboard
- Resets quiz state

### `calculateScore()`
- Loops through all responses
- Compares with correct answers
- Returns `{ correctAnswers, totalQuestions, percentage }`

### `updateLeaderboard(submission)`
- Adds submission to `todaysLeaderboard`
- Sorts by: correct answers DESC, time ASC
- Keeps only top 3

---

## 🎨 CSS Classes

```css
.quiz__container          /* Main wrapper */
.daily-quiz__container    /* Daily quiz section */
.quiz__countdown          /* Pre-quiz countdown display */
.quiz__ready              /* Active quiz session */
.quiz__leader             /* Leaderboard section */
.quiz__previous           /* History section */
.quiz-session__timer      /* Timer display (red if <30s) */
.quiz-option              /* Answer button */
.quiz-option.selected     /* Highlighted answer */
.status-badge.correct     /* Green checkmark */
.status-badge.incorrect   /* Red X mark */
.siren-blink              /* Animated siren icon */
.live-text                /* "LIVE" blinking text */
```

---

## 🚨 Error Scenarios (Backend Handles)

| Scenario | Current Behavior | Backend Should |
|----------|------------------|-----------------|
| No questions added | Alert message | Reject submission |
| Duplicate submission | Not checked | Reject with existing ID |
| Late submission | Accepted | Reject after 8:02 PM |
| Unauth user | Not checked | Require auth token |
| Invalid answer format | Not validated | Server-side validate |
| Network timeout | Not handled | Implement retry |

---

## 📱 Responsive Design

- **Desktop**: Full layout, side-by-side sections
- **Tablet**: Stacked layout
- **Mobile**: Single column, full width

Quiz session optimized for:
- Large readable text
- Full-width options
- Portrait orientation
- Touch-friendly buttons

---

## 🔐 Security Notes

### What Frontend Does
- Validates form inputs
- Stores state in component memory
- Calculates score locally
- Tracks time locally

### What Backend Must Do
- Validate all answers server-side
- Calculate score independently  
- Track actual submission time
- Check quiz window
- Prevent duplicate submissions
- Hide correct answers during quiz
- Enforce user authentication

---

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Timer not updating | useEffect dependency missing | Check dependency array |
| Quiz not starting | Not in 8-8:02 PM window | Set system time to 8 PM |
| Answers not saving | quizResponses not updated | Check handleSelectOption |
| Leaderboard empty | No submissions yet | Complete a quiz first |
| Images not showing | Base64 too large | Use URL instead |
| Styles broken | CSS not imported | Verify quiz.css path |

---

## 📞 Key Code Locations

| What | Where | Lines |
|------|-------|-------|
| State initialization | QuizScreen.jsx | 25-60 |
| Form handling | QuizScreen.jsx | 62-150 |
| Quiz logic | QuizScreen.jsx | 152-250 |
| Timers | QuizScreen.jsx | 268-354 |
| JSX render | QuizScreen.jsx | 356-857 |
| Styling | quiz.css | all |
| Instructions | DAILY_QUIZ_IMPLEMENTATION.md | all |
| API template | BACKEND_API_TEMPLATE.js | all |

---

## ✅ Implementation Checklist

### Frontend ✅
- [x] Question form with validation
- [x] Quiz session UI
- [x] Timer countdowns
- [x] Score calculation
- [x] Leaderboard display
- [x] History tracking
- [x] Responsive design
- [x] State management
- [x] Error handling (local)

### Backend ⏳
- [ ] 5 API endpoints
- [ ] Database schema
- [ ] Quiz window validation
- [ ] Ranking algorithm
- [ ] Security validations
- [ ] Error responses
- [ ] Rate limiting
- [ ] Cron jobs for ranking

---

**Last Updated**: Jan 25, 2026  
**Status**: Frontend Complete ✅ | Backend Pending ⏳
