import TopicQuiz from '../components/common/TopicQuiz';
import { useState, useEffect, useRef } from 'react';
import '../assets/styles/quiz.css';
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS, API_BASE_URL } from '../config/api';
import { TbPointFilled } from "react-icons/tb";
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from "react-icons/tb";
import {
  Sparkles,
  WandSparkles,
  Sparkle,
  Siren,
  Trophy,
  TimerReset,
  BadgeInfo,
  CalendarDays,
  MoveRight,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';


export default function QuizScreen() {
  
  const { user } = useAuth();
  const [isActive, setIsActive] = useState('daily quiz');
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [isCorrect] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ 
    beforeQuiz: { hours: 0, minutes: 0, seconds: 0 },
    duringQuiz: { minutes: 0, seconds: 0 }
  });
  const timerCompletedRef = useRef(false);
  const restTimerRef = useRef(null); // Track when rest period started
  const targetDateRef = useRef(null); // Persistent next-target date

  // ===== COUNTDOWN TIMER TO 8:30 PM =====
  useEffect(() => {
    // initialize persistent target date to next occurrence of target hour
    if (!targetDateRef.current) {
      const nowInit = new Date();
      const t = new Date(nowInit);
      t.setHours(17, 31, 0, 0); // target hour: 16:32 local
      if (t <= nowInit) t.setDate(t.getDate() + 1);
      targetDateRef.current = t;
    }

    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(targetDateRef.current);

      // If we're currently in the rest period, show zeros until rest ends
      if (restTimerRef.current) {
        const restElapsed = now - restTimerRef.current;
        const restRemaining = 120000 - restElapsed; // 2 minutes
        if (restRemaining > 0) {
          setTimeLeft({ beforeQuiz: { hours: 0, minutes: 0, seconds: 0 }, duringQuiz: { minutes: 0, seconds: 0 } });
          return;
        }
        // rest over: clear it and proceed (targetDateRef already points to next day)
        restTimerRef.current = null;
      }

      const diffMs = target - now;

      // If we've reached the target, start live quiz (if eligible)
      if (diffMs <= 0) {
        if (!quizStarted && !timerCompletedRef.current && !restTimerRef.current) {
          setTimeLeft({ beforeQuiz: { hours: 0, minutes: 0, seconds: 0 }, duringQuiz: { minutes: 2, seconds: 0 } });
          setQuizStarted(true);
        } else {
          // show zeros until rest or next actions
          setTimeLeft({ beforeQuiz: { hours: 0, minutes: 0, seconds: 0 }, duringQuiz: { minutes: 0, seconds: 0 } });
        }
        return;
      }

      // If a new countdown cycle begins, reset the one-time timer flag
      if (diffMs > 0 && timerCompletedRef.current) {
        timerCompletedRef.current = false;
      }

      const secondsRemaining = Math.max(0, Math.round(diffMs / 1000));
      const hours = Math.floor(secondsRemaining / 3600);
      const minutes = Math.floor((secondsRemaining % 3600) / 60);
      const seconds = secondsRemaining % 60;

      setTimeLeft({ beforeQuiz: { hours, minutes, seconds }, duringQuiz: { minutes: 0, seconds: 0 } });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [quizStarted]);


  // When the quiz starts, run a 2-minute during-quiz timer and then trigger rest
  useEffect(() => {
    let interval = null;
    if (quizStarted && !timerCompletedRef.current) {
      let remaining = 120; // seconds

      // initial UI update
      setTimeout(() => {
        const mins0 = Math.floor(remaining / 60);
        const secs0 = remaining % 60;
        setTimeLeft(prev => ({ ...prev, duringQuiz: { minutes: mins0, seconds: secs0 } }));
      }, 0);

      interval = setInterval(() => {
        remaining -= 1;
        const mins = Math.floor(Math.max(0, remaining) / 60);
        const secs = Math.max(0, remaining) % 60;
        setTimeLeft(prev => ({ ...prev, duringQuiz: { minutes: mins, seconds: secs } }));

        if (remaining <= 0) {
          clearInterval(interval);
          timerCompletedRef.current = true; // mark that this cycle's live window completed
          setQuizStarted(false); // close live window
          // start rest period now
          restTimerRef.current = Date.now();
          // schedule next day's target immediately so countdown resumes after rest
          if (targetDateRef.current) {
            const next = new Date(targetDateRef.current);
            next.setDate(next.getDate() + 1);
            targetDateRef.current = next;
          }
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [quizStarted]);







// const now = new Date();
// const target = new Date(now);
// console.log(target.setHours(17, 21, 0, 0))


  return (
    <div className="quiz__container">
      <div className="transcript__header">
        <div className="transcript__header-title">
          <h1><span><Sparkles size={25}/></span> Quiz Center</h1>
          <p className="transcript__header-subtitle">Challenge others to climb up the leaderboard</p>
        </div>
        
        <div className="quiz__nav-btn">
          <button 
            className={isActive === 'daily quiz' ? 'active-quiz' : ''} 
            onClick={() => setIsActive('daily quiz')}
          >
            <WandSparkles size={18} /> Daily Quiz
          </button>
          <button 
            className={isActive === 'topic quiz' ? 'active-quiz' : ''} 
            onClick={() => setIsActive('topic quiz')}
          >
            <Sparkle size={18} /> Topic Quiz
          </button>
          {user?.role === 'admin' && (
            <button 
              className={isActive === 'admin' ? 'active-quiz' : ''} 
              onClick={() => setIsActive('admin')}
            >
              <Plus size={18} /> Add Question
            </button>
          )}
        </div>
      </div>


      {isActive === 'daily quiz' && 
      <div className="daily-quiz__container">
        
        {/* QUIZ READY (ACTIVE QUIZ SESSION) */}
        {/* {quizStarted && (
          <div className="quiz__ready">
            <div className="quiz-session__container">
              <div className="quiz-session__header">
                <div className="quiz-session__question-number">
                  <span>Question 1 of 5</span>
                </div>

                <div className="quiz-session__timer">
                  <span><TimerReset /></span>
                  <span className="quiz-session__time">
                    <span>{String(timeLeft.duringQuiz.minutes).padStart(2, '0')}</span>:<span>{String(timeLeft.duringQuiz.seconds).padStart(2, '0')}</span>
                  </span>
                </div>
              </div>

                <>
                    <div className="quiz-session__image">
                      <img src='' alt="question" />
                    </div>

                  <div className="quiz-session__question">
                    <h3>What is HTML</h3>
                  </div>

                  <div className="quiz-session__options">
                    <button className={`quiz-option`}>
                      <span className="option-circle">A</span>
                      <span className="option-content">Skelenton</span>
                    </button>
                  </div>

                  <div className="quiz-session__navigation" style={{
                    display: 'flex',
                    gap: '12px',
                    marginTop: '24px'
                  }}>
                    <button className="quiz-session__btn">
                      ← Previous
                    </button>

                      <button className="quiz-session__submit-btn" >
                        Next Question <span><MoveRight size={16} /></span>
                      </button>
                  </div>
                </>
              
            </div>
          </div>
        )} */}

        {/* QUIZ COUNTDOWN AND CONTROLS */}
        {!quizStarted && (
          <div className="quiz__countdown">
            <div className="quiz__back">
              <div></div>
              <div></div>
              <div></div>
            </div>

            
              <div className="before__quiz">
                <h2> <span className="siren-blink"><Siren size={25}/></span> Next Daily Quiz In:</h2>

                <div className="quiz__timer">
                  <div className="quiz__time-box">
                    <span>{String(timeLeft.beforeQuiz.hours).padStart(2, '0')}</span>
                    <small>Hours</small>
                  </div>
                  <div className="quiz__time-box">
                    <span>{String(timeLeft.beforeQuiz.minutes).padStart(2, '0')}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="quiz__time-box">
                    <span>{String(timeLeft.beforeQuiz.seconds).padStart(2, '0')}</span>
                    <small>Seconds</small>
                  </div>
                </div>

                <div className='scoring__rule'>
                  <p> Scoring rule: </p>
                  <div>
                    <span><i><TbPointFilled/></i>1st:   <small>5 pts + correct answers</small></span>
                    <span><i><TbPointFilled/></i>2nd:   <small>3 pts + correct answers</small></span>
                    <span><i><TbPointFilled/></i>3rd:   <small>1 pt + correct answers</small></span>
                    <span><i><TbPointFilled/></i>others:   <small>0 pts + correct answers</small></span>
                  </div>
                </div>
              </div>
          </div>
        )}

        {quizStarted && (
          <div className="quiz__countdown">
              <div className="during__quiz">
                <h2><span className="siren-blink live-text">LIVE</span> Quiz is on now!</h2>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  3 questions available • Quiz window closes in:
                </p>

                <div className="quiz__timer">
                  <div className="quiz__time-box live-time-box">
                    <span>{String(timeLeft.duringQuiz.minutes).padStart(2, '0')}</span>
                    <small>Minutes</small>
                  </div>
                  <div className="quiz__time-box live-time-box">
                    <span>{String(timeLeft.duringQuiz.seconds).padStart(2, '0')}</span>
                    <small>Seconds</small>
                  </div>
                </div>

                  <button className="quiz__start-btn">
                    Start Quiz
                  </button>
              </div>
          </div>
        )}

        <div className="quiz__article">
          {/* LEADERBOARD */}
          <div className="quiz__leader">
            <div className="quiz__leader-header">
                <h4><span><Trophy size={20}/></span>Today's Top 3</h4>
                <small className="quiz__date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
            </div>

            <button>View Leaderboard</button>

            <div className="quiz__leader-list">
                  {/* const rankIcon = rank === 1 ? <TbHexagonNumber1Filled/> : rank === 2 ? <TbHexagonNumber2Filled/> : <TbHexagonNumber3Filled/>; */}
                  
                 
                    <div className="quiz__leader-item">
                      <span className="quiz__leader-rank"><TbHexagonNumber1Filled/></span>
                      <div className="quiz__leader-info">
                        <h5>Student 3</h5>
                        <small>Score: 3/3</small>
                      </div>
                      <small className="quiz__time"><span><TimerReset size={15}/></span> 8:31</small>
                    </div>

                    <div className="quiz__leader-item">
                      <span className="quiz__leader-rank"><TbHexagonNumber2Filled/></span>
                      <div className="quiz__leader-info">
                        <h5>Student 2</h5>
                        <small>Score: 3/3</small>
                      </div>
                      <small className="quiz__time"><span><TimerReset size={15}/></span> 8:31</small>
                    </div>

                    <div className="quiz__leader-item">
                      <span className="quiz__leader-rank"><TbHexagonNumber3Filled/></span>
                      <div className="quiz__leader-info">
                        <h5>Student 1</h5>
                        <small>Score: 3/3</small>
                      </div>
                      <small className="quiz__time"><span><TimerReset size={15}/></span> 8:31</small>
                    </div>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="quiz__instruction">
            <h4><span><BadgeInfo/></span>How it works</h4>
            <ol>
              <li>The Daily Quiz window is set by administrators. Check the countdown timer below for timing.</li>
              <li>When the quiz is live, click on the "Start Quiz" button to begin.</li>
              <li>Answer all questions before the timer expires.</li>
              <li>Your score is based on correct answers and submission time.</li>
              <li>Top 3 performers get bonus points (5/3/1 pts).</li>
              <li>Check the leaderboard to see your ranking!</li>
            </ol>
          </div>
        </div>

        {/* PREVIOUS QUIZZES */}
        <div className="quiz__previous">
          <h3><span><WandSparkles/></span>Previous Quizzes</h3>
          
          <div className="quiz__previous-dates">
                <div className={`quiz__date-item`}>
                  <button className="quiz__date-btn">
                    <span><CalendarDays/></span>
                    <span className="date-label">
                      {new Date().toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="quiz__score-badge">
                      3/3
                    </span>
                  </button>

                    <div className="quiz__date-content">
                          <div className="quiz__question-item">
                            <div className="question-header">
                              <h4><small>Question 1:</small></h4>
                              <span className={`status-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                            </div>

                            <div className="quiz-question">
                              What is HTML
                            </div>

                              <div style={{ margin: '12px 0' }}>
                                <img src='' alt="question" style={{ maxWidth: '100%', borderRadius: '4px' }} />
                              </div>

                            <div className="answer-section">
                                  <div>
                                    <span className="option-letter">A</span>
                                    <span className="option-text">Skelenton</span>
                                  </div>
                            </div>
                          </div>
                    </div>
                </div>
          </div>
        </div>
      </div>}

      {/* {isActive === 'topic quiz' && 
        <TopicQuiz/>} */}

      {/* {isActive === 'admin' && user?.role === 'admin' && (
        <div className="admin-form__container">
          <div className="admin-form__header">
            <h2><Plus size={28} /> Add New Daily Quiz Question</h2>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
              Questions added here will be available for today's quiz window ({todaysQuestions.length} question{todaysQuestions.length !== 1 ? 's' : ''} added so far)
            </p>
          </div>

          <form onSubmit={handleSubmitQuestion} className="admin-form">
            <div className="form-group">
              <label htmlFor="question">Question *</label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleFormChange}
                placeholder="Enter the quiz question..."
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Question Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className="file-input"
              />
              <p className="file-info">Supported formats: JPG, PNG, GIF, WebP</p>
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="optionA">Option A *</label>
                <input
                  type="text"
                  id="optionA"
                  name="optionA"
                  value={formData.optionA}
                  onChange={handleFormChange}
                  placeholder="Enter option A..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="optionB">Option B *</label>
                <input
                  type="text"
                  id="optionB"
                  name="optionB"
                  value={formData.optionB}
                  onChange={handleFormChange}
                  placeholder="Enter option B..."
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="optionC">Option C *</label>
                <input
                  type="text"
                  id="optionC"
                  name="optionC"
                  value={formData.optionC}
                  onChange={handleFormChange}
                  placeholder="Enter option C..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="optionD">Option D *</label>
                <input
                  type="text"
                  id="optionD"
                  name="optionD"
                  value={formData.optionD}
                  onChange={handleFormChange}
                  placeholder="Enter option D..."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="correctAnswer">Correct Answer *</label>
              <select
                id="correctAnswer"
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleFormChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="form-btn submit-btn">Add Question</button>
              <button type="button" className="form-btn cancel-btn" onClick={() => setIsActive('daily quiz')}>Back to Quiz</button>
            </div>
          </form>

          {todaysQuestions.length > 0 && (
            <div style={{
              marginTop: '32px',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <h3 style={{ marginBottom: '16px' }}>📋 Today's Questions Preview</h3>
              {todaysQuestions.map((q, index) => (
                <div key={q.id} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: '#20043d',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <p><strong>Q{index + 1}:</strong> {q.question}</p>
                    <small style={{ color: '#666' }}>Correct Answer: {q.correctAnswer}</small>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    style={{
                      padding: '6px 12px',
                      marginLeft: '12px',
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <X size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}