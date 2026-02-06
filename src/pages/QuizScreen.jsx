
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import '../assets/styles/quiz.css';
import { useAuth } from '../context/AuthContext';
import { AttemptedTopicQuiz } from '../components/common/TopicQuiz'
import { API_BASE_URL } from '../config/api';
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
  MoveLeft,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { DailyQuizData } from '../quizData.js';



export default function QuizScreen() {
  
  const { user } = useAuth();
  const [isActive, setIsActive] = useState('daily quiz');
  
  const [quizIsLive, setQuizIsLive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submissionInProgress, setSubmissionInProgress] = useState(false);
  const [submissionDone, setSubmissionDone] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ 
    beforeQuiz: { hours: 0, minutes: 0, seconds: 0 },
    duringQuiz: { minutes: 0, seconds: 0 }
  });
  const [dailyTop, setDailyTop] = useState([]);
  const [leaderLoading, setLeaderLoading] = useState(false);
  const timerCompletedRef = useRef(false);
  const restTimerRef = useRef(null); // Track when rest period started
  const targetDateRef = useRef(null); // Persistent next-target date

  function handleSubmitQuiz() {
    // compute timeTaken in seconds (120 - remaining)
    const totalSeconds = 120;
    const remaining = (timeLeft.duringQuiz.minutes || 0) * 60 + (timeLeft.duringQuiz.seconds || 0);
    const timeTaken = Math.max(0, totalSeconds - remaining);

    // assemble answers from today's question set
    const entry = DailyQuizData.find(d => d.date === todayStr) || DailyQuizData[0] || { questions: [] };
    const questions = entry.questions || [];
    const answers = questions.map(q => ({
      questionId: q.id,
      questionText: q.question,
      selectedOption: selectedOptions[q.id] || null,
      correctAnswer: q.correctAnswer || null,
    }));

    // send to backend batch submit endpoint
    (async () => {
      setSubmissionInProgress(true);
      setSubmissionError(null);
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (user && user.token) headers['Authorization'] = `Bearer ${user.token}`;

        const res = await fetch(`${API_BASE_URL}/api/quiz-attempts/submit`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ topic: 'daily', answers, timeTaken }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => res.statusText || 'Unknown error');
          setSubmissionError(`Server responded: ${res.status} ${text}`);
          setSubmissionInProgress(false);
          return;
        }

        const data = await res.json();
        console.log('Quiz submitted', data);
        setSubmissionDone(true);
        setSubmissionInProgress(false);
        // stop the quiz UI
        setQuizStarted(false);
        // auto-hide success after short delay
        setTimeout(() => setSubmissionDone(false), 3500);
      } catch (err) {
        console.error('Error submitting quiz', err);
        setSubmissionError(err.message || 'Network error');
        setSubmissionInProgress(false);
      }
    })();
  }

  // ===== COUNTDOWN TIMER TO 8:30 PM =====
  useEffect(() => {
    // initialize persistent target date to next occurrence of target hour
    if (!targetDateRef.current) {
      const nowInit = new Date();
      const t = new Date(nowInit);
      t.setHours(17, 52, 0, 0); // target hour: 16:32 local
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
        if (!quizIsLive && !timerCompletedRef.current && !restTimerRef.current) {
          setTimeLeft({ beforeQuiz: { hours: 0, minutes: 0, seconds: 0 }, duringQuiz: { minutes: 2, seconds: 0 } });
          setQuizIsLive(true);
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
  }, [quizIsLive]);

  // Fetch today's top 3 leaderboard for daily quiz
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLeaderLoading(true);
      try {
        const iso = new Date().toISOString().slice(0, 10);
        const headers = {};
        if (user && user.token) headers['Authorization'] = `Bearer ${user.token}`;

        const res = await fetch(`${API_BASE_URL}/api/quiz-attempts/leaderboard/daily?date=${iso}`, { headers });
        if (!res.ok) {
          setDailyTop([]);
          setLeaderLoading(false);
          return;
        }
        const data = await res.json();
        setDailyTop(data.top || []);
      } catch (err) {
        console.error('Error fetching leaderboard', err);
        setDailyTop([]);
      } finally {
        setLeaderLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user, submissionDone]);


  // When the quiz starts, run a 2-minute during-quiz timer and then trigger rest
  useEffect(() => {
    let interval = null;
    if (quizIsLive && !timerCompletedRef.current) {
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
          setQuizIsLive(false); // close live window
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
  }, [quizIsLive]);

                const now = new Date();
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const yyyy = now.getFullYear();
                const todayStr = `${mm}/${dd}/${yyyy}`;
                const entry = DailyQuizData.find(d => d.date === todayStr) || DailyQuizData[0] || { questions: [] };
                const questions = entry.questions || [];



  return (
    <div className="quiz__container">
      <div className="transcript__header">
        <div className="transcript__header-title">
          <h1>
            <span><Sparkles size={25}/></span> 
            {isActive === 'daily quiz' ? 'Daily' : 'Topic'} Quiz Center
          </h1>
          <p className="transcript__header-subtitle">
            {
              isActive === 'daily quiz' ? 'Challenge others to climb up the leaderboard' : 
              'Check out list of topic base quizzes you already attempted'}
          </p>
        </div>
        {/* Submission toast / modal */}
        {submissionInProgress && (
          <div style={{ position: 'fixed', right: 20, top: 80, background: '#fff3cd', color: '#664d03', padding: '10px 14px', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 1200 }}>
            Submitting your answers…
          </div>
        )}

        {submissionDone && (
          <div style={{ position: 'fixed', right: 20, top: 80, background: '#d1e7dd', color: '#0f5132', padding: '10px 14px', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 1200 }}>
            Quiz submitted successfully.
          </div>
        )}

        {submissionError && (
          <div style={{ position: 'fixed', right: 20, top: 80, background: '#f8d7da', color: '#842029', padding: '10px 14px', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', zIndex: 1200 }}>
            <div style={{ marginBottom: 6 }}>Error submitting quiz: {submissionError}</div>
            <button onClick={() => setSubmissionError(null)} style={{ background: 'transparent', border: 'none', color: '#842029', textDecoration: 'underline', cursor: 'pointer' }}>Close</button>
          </div>
        )}
        
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
        </div>
      </div>


      {isActive === 'daily quiz' && 
      <div className="daily-quiz__container">

        {/* QUIZ COUNTDOWN AND CONTROLS */}
        {!quizIsLive && (
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

        {(quizIsLive && !quizStarted)  && (
          <div className="quiz__countdown">
              <div className="during__quiz">
                <h2><span className="siren-blink live-text">LIVE</span> Quiz is on now!</h2>
                <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
                  {Math.max(questions.length, 1)} questions available • Quiz window closes in:
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

                  <button className="quiz__start-btn" onClick={() => setQuizStarted(true)}>
                    Start Quiz
                  </button>
              </div>
          </div>
        )}


        {/* QUIZ QUESTIONS */}
        {(quizIsLive && quizStarted) && 
          <article className='daily-quiz__live'>
            <div className="daily-quiz__box">
              {(() => {
                const now = new Date();
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const yyyy = now.getFullYear();
                const todayStr = `${mm}/${dd}/${yyyy}`;
                const entry = DailyQuizData.find(d => d.date === todayStr) || DailyQuizData[0] || { questions: [] };
                const questions = entry.questions || [];
                const q = questions[currentQuestionIndex] || null;

                return (
                  <>
                    <div className="daily-quiz__header">
                      <span>Question {Math.min(currentQuestionIndex + 1, Math.max(questions.length, 1))} of {Math.max(questions.length, 1)}</span>
                      <span className='daily-quiz__timer'><TimerReset size={18}/> 
                        {String(timeLeft.duringQuiz.minutes).padStart(2, '0')} : {String(timeLeft.duringQuiz.seconds).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="daily-quiz__questions">
                      {q ? (
                        <div className='daily-quiz__question'>
                          <h4>{q.question}</h4>

                          <div className="daily-quiz__options">
                            {q.options.map(opt => (
                              <button
                                key={opt.id}
                                className={`daily-quiz__option ${selectedOptions[q.id] === opt.id ? 'selected' : ''}`}
                                onClick={() => !submissionInProgress && !submissionDone && setSelectedOptions(prev => ({ ...prev, [q.id]: opt.id }))}
                                disabled={submissionInProgress || submissionDone}
                              >
                                <span>{opt.id}</span>
                                {opt.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className='daily-quiz__question'>
                          <h4>No questions available for today.</h4>
                        </div>
                      )}
                    </div>

                    <div className="daily-quiz__nav">
                      <button className={currentQuestionIndex === 0 ? 'daily-quiz__nav-disabled' : ''} disabled={currentQuestionIndex === 0 || submissionInProgress || submissionDone} onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}>
                        <span><MoveLeft size={16} /></span> 
                        Previous
                      </button>
                      
                      { (currentQuestionIndex < questions.length - 1) ? (
                        <button disabled={submissionInProgress || submissionDone} onClick={() => setCurrentQuestionIndex(i => Math.min(i + 1, Math.max(0, questions.length - 1)))}>
                          Next 
                          <span><MoveRight size={16} /></span>
                        </button> ) : (
                        <button disabled={submissionInProgress || submissionDone} onClick={handleSubmitQuiz}>{submissionInProgress ? 'Submitting...' : 'Finish'}</button>)}     
                    </div>  
                  </>
                );
              })()}
            </div>
          </article>
        }










        <div className="quiz__article">
          {/* LEADERBOARD */}
          <div className="quiz__leader">
            <div className="quiz__leader-header">
                <h4><span><Trophy size={20}/></span>Today's Top 3</h4>
                <small className="quiz__date">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</small>
            </div>

            <button><Link to="/leaderboard">View Leaderboard</Link></button>

            <div className="quiz__leader-list">
              {leaderLoading && <div style={{ padding: 12 }}>Loading leaderboard…</div>}
              {!leaderLoading && dailyTop.length === 0 && (
                <div style={{ padding: 12, color: '#666' }}>No attempts yet for today.</div>
              )}

              {!leaderLoading && dailyTop.map(item => (
                <div key={item.studentId || item.rank} className="quiz__leader-item">
                  <span className="quiz__leader-rank">
                    {item.rank === 1 ? <TbHexagonNumber1Filled/> : item.rank === 2 ? <TbHexagonNumber2Filled/> : <TbHexagonNumber3Filled/>}
                  </span>
                  <div className="quiz__leader-info">
                    <h5>{item.name || item.username || 'Unknown'}</h5>
                    <small>Score: {item.score}/{item.total}</small>
                  </div>
                  <small className="quiz__time"><span><TimerReset size={15}/></span> {Math.floor((item.timeTaken||0)/60)}:{String((item.timeTaken||0)%60).padStart(2,'0')}</small>
                </div>
              ))}
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

                              {/* <div style={{ margin: '12px 0' }}>
                                <img src='' alt="question" style={{ maxWidth: '100%', borderRadius: '4px' }} />
                              </div> */}

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

      
      
      
      {isActive === 'topic quiz' && 
        <>
          <AttemptedTopicQuiz/>
        </>
      }

    </div>
  );
}
