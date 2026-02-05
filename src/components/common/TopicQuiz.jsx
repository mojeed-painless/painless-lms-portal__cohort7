import { useState, useEffect, useRef } from 'react';
import '../../assets/styles/topicQuiz.css';
import { TopicQuizData } from '../../quizData';
import {
  TimerReset,
  MoveRight,
  MoveLeft,
  X,
  Check,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

export default function TopicQuiz({currentCategory, currentTopic, onSelect}) {

    const { user } = useAuth();
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

    const [activeQuestion, setActiveQuestion] = useState(1);
    const [quizStarted, setQuizStarted] = useState(false);
    const [showStartConfirm, setShowStartConfirm] = useState(false);
    const [showFinishConfirm, setShowFinishConfirm] = useState(false);
    const [answers, setAnswers] = useState({}); // { questionId: selectedOption }
    const [attempted, setAttempted] = useState(false);
    const [showAttempted, setShowAttempted] = useState(false);
    const [attemptedAnswers, setAttemptedAnswers] = useState({}); // { questionId: { selectedOption, correctAnswer } }

    const [remainingSeconds, setRemainingSeconds] = useState(180); // 3 minutes
    const timerRef = useRef(null);

    const postAnswer = async (payload) => {
      try {
        await fetch(`${API_BASE}/api/quiz-answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error('Failed to submit answer', err);
      }
    };

    const handleOptionSelect = async (questionId, selectedOption, questionText, correctAnswer) => {
      setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));

      // POST each selection to backend immediately
      await postAnswer({
        topic: currentTopic,
        questionId: String(questionId),
        questionText: questionText || '',
        selectedOption,
        correctAnswer: correctAnswer || null,
      });
    };

    // fetch whether user already attempted this topic and their answers
    const fetchAttemptData = async () => {
      try {
        // check attempts
        const attRes = await fetch(`${API_BASE}/api/quiz-attempts`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
        });
        if (attRes.ok) {
          const attData = await attRes.json();
          const found = attData.find(a => a.topic === currentTopic);
          if (found) setAttempted(true);
        }

        // fetch answers for this topic
        const ansRes = await fetch(`${API_BASE}/api/quiz-answers?topic=${encodeURIComponent(currentTopic)}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
        });
        if (ansRes.ok) {
          const ansData = await ansRes.json();
          const map = {};
          ansData.forEach(a => {
            map[String(a.questionId)] = { selectedOption: a.selectedOption, correctAnswer: a.correctAnswer };
          });
          setAttemptedAnswers(map);
        }
      } catch (err) {
        // ignore — fallback behavior handled elsewhere
        console.error('Failed to fetch attempt data', err);
      }
    };

    const handleStartConfirm = () => {
      setShowStartConfirm(false);
      // prevent starting if already attempted
      if (attempted) return setShowAttempted(true);
      setQuizStarted(true);
      setRemainingSeconds(180);

      // start countdown
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            // auto finish when timer hits 0
            handleFinishConfirm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const [showResult, setShowResult] = useState(false);
    const [resultData, setResultData] = useState({ score: 0, total: 0, timeTaken: 0 });

    const computeAndShowResult = async (questions) => {
      const total = questions.length;
      let score = 0;
      questions.forEach(q => {
        const sel = answers[String(q.id)];
        if (sel && q.correctAnswer && sel === q.correctAnswer) score += 1;
      });
      const timeTaken = 180 - (remainingSeconds || 0);
      setResultData({ score, total, timeTaken });
      // persist attempt to backend
      try {
        const payload = { topic: currentTopic, score, total, timeTaken };
        await fetch(`${API_BASE}/api/quiz-attempts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
          body: JSON.stringify(payload),
        });
        // mark attempted and store answers from local state
        setAttempted(true);
        const map = {};
        Object.keys(answers).forEach(qid => {
          // try to get correctAnswer from TopicQuizData
          const topicObj = TopicQuizData.find(t => t.topic === currentTopic);
          const q = topicObj?.questions?.find(x => String(x.id) === String(qid));
          map[String(qid)] = { selectedOption: answers[qid], correctAnswer: q?.correctAnswer || null };
        });
        setAttemptedAnswers(map);
      } catch (err) {
        // fallback to localStorage if backend fails
        try {
          const key = 'quiz_attempts';
          const attempts = JSON.parse(localStorage.getItem(key) || '[]');
          const attempt = { topic: currentTopic, date: new Date().toISOString(), score, total, timeTaken };
          attempts.unshift(attempt);
          localStorage.setItem(key, JSON.stringify(attempts.slice(0, 100)));
        } catch (e) {
          console.error('Failed to save quiz attempt', e);
        }
        console.error('Failed to save quiz attempt to backend', err);
      }
      setShowResult(true);
    };

    const handleFinishConfirm = async () => {
      setShowFinishConfirm(false);

      // stop timer immediately
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // stop quiz UI
      setQuizStarted(false);

      // compute score from TopicQuizData for currentTopic
      const topicObj = TopicQuizData.find(t => t.topic === currentTopic);
      if (topicObj) {
        await computeAndShowResult(topicObj.questions);
      } else {
        // fallback
        setResultData({ score: 0, total: 0, timeTaken: 180 - (remainingSeconds || 0) });
        setShowResult(true);
      }
    };

    // cleanup on unmount
    useEffect(() => {
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, []);

    // load attempt/answers when topic or user changes
    useEffect(() => {
      if (!currentTopic) return;
      fetchAttemptData();
    }, [currentTopic, user]);

    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${String(m).padStart(1, '0')} : ${String(s).padStart(2, '0')}`;
    };

    return (
      <>
        {TopicQuizData.map(({topic, category, questions}) => (
          topic === currentTopic && 
          <div className="topic-quiz__box" key={topic}>
            <div className="topic-quiz__header">
              <span>Question {quizStarted ? activeQuestion : 0} of {questions.length}</span>
              <span className='topic-quiz__timer'><TimerReset size={18}/> {formatTime(remainingSeconds)}</span>
              {!quizStarted && <div onClick={onSelect} style={{cursor: 'pointer'}}><X size={20}/></div>}
            </div>

            {/* If quiz not started show a start button that triggers confirmation */}
            {!quizStarted ? (
              attempted ? (
                <>
                  { !showAttempted &&
                  <>
                    <p style={{ marginBottom: '10px', padding: '0 0.6rem', textAlign: 'center' }}>You have already completed the quiz for <strong>{topic}</strong>.</p>
                    <button className="take-quiz-btn" onClick={() => {
                      setShowAttempted(prev => {
                        const next = !prev;
                        if (next) setActiveQuestion(1);
                        return next;
                      });
                    }}>{showAttempted ? 'Hide my quiz' : 'Show my quiz'}</button>
                  </>
                  }

                  {showAttempted && (
                    <>
                      <div className="topic-quiz__questions">
                        {(() => {
                          const q = questions.find(tq => String(tq.id) === String(activeQuestion)) || questions[0];
                          const { id: questionId, question, options, correctAnswer } = q;
                          return (
                            <div className={`topic-quiz__question ${questionId === activeQuestion ? 'active-question' : ''}`} key={questionId}>
                              <h4>{question}</h4>
                              <div className="topic-quiz__options">
                                {options.map(({id: optionId, text}, index) => {
                                  const optionLetter = String.fromCharCode(65 + index);
                                  const record = attemptedAnswers[String(questionId)] || {};
                                  const sel = record.selectedOption || answers[String(questionId)];
                                  const corr = record.correctAnswer || correctAnswer;
                                  const isSelected = sel === optionLetter;
                                  const isCorrect = corr === optionLetter;
                                  return (
                                    <button
                                      key={optionId}
                                      className={`topic-quiz__option disabled ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${(!isCorrect && isSelected) ? 'incorrect' : ''}`}
                                      disabled
                                    >
                                      <span className={isCorrect ? 'correct' : (isSelected ? 'incorrect' : '')}>
                                        {isCorrect ? <Check size={14}/> : (isSelected ? <X size={14}/> : optionLetter)}
                                      </span>
                                      {text}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="topic-quiz__nav">
                        {activeQuestion > 1 ? 
                          <button onClick={() => setActiveQuestion(prev => prev - 1)}><span><MoveLeft size={16} /></span> Previous</button> :
                          <button className='topic-quiz__nav-disabled' disabled><span><MoveLeft size={16} /></span> Previous</button>
                        }

                        {activeQuestion < questions.length ? 
                          <button onClick={() => setActiveQuestion(prev => prev + 1)}>Next <span><MoveRight size={16} /></span></button> :
                          <button className='topic-quiz__nav-disabled' disabled>Next <span><MoveRight size={16} /></span></button>
                        }
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div style={{ padding: '28px', textAlign: 'center' }}>
                  <p style={{ marginBottom: '12px' }}>Ready to start the quiz for <strong>{topic}</strong>?</p>
                  <button className="take-quiz-btn" onClick={() => setShowStartConfirm(true)}>Take Quiz</button>
                </div>
              )
            ) : (
              <div className="topic-quiz__questions">
                {questions.map(({id: questionId, question, options, correctAnswer}) => (
                    <div className={`topic-quiz__question ${questionId === activeQuestion ? 'active-question' : ''}`} key={questionId}>
                      <h4>{question}</h4>
                      <div className="topic-quiz__options">
                        {options.map(({id: optionId, text}, index) => {
                          const optionLetter = String.fromCharCode(65 + index);
                          const isSelected = answers[String(questionId)] === optionLetter;
                          return (
                            <button
                              key={optionId}
                              className={`topic-quiz__option ${isSelected ? 'selected' : ''}`}
                              onClick={() => handleOptionSelect(questionId, optionLetter, question, correctAnswer)}
                            >
                              <span>{optionLetter}</span> {text}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                }
              </div>
            )}

            {quizStarted && <div className="topic-quiz__nav">
              {activeQuestion > 1 ? 
                <button onClick={() => setActiveQuestion(prev => prev - 1)}><span><MoveLeft size={16} /></span> Previous</button> :
                <button className='topic-quiz__nav-disabled' disabled><span><MoveLeft size={16} /></span> Previous</button>
              }

              {activeQuestion < questions.length ? 
                <button onClick={() => setActiveQuestion(prev => prev + 1)}>Next <span><MoveRight size={16} /></span></button> :
                <button onClick={() => setShowFinishConfirm(true)}>Finish Quiz</button>
              }
            </div>}

            {/* START CONFIRM MODAL */}
            {showStartConfirm && (
              <div className="modal-backdrop">
                <div className="modal-panel">
                  <h3>Start Quiz</h3>
                  <p>Are you sure you are ready to take the quiz? Once you start the timer will begin.</p>
                  <div className="modal-actions">
                    <button className="modal-btn confirm" onClick={handleStartConfirm}>Yes, Start</button>
                    <button className="modal-btn" onClick={() => setShowStartConfirm(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* FINISH CONFIRM MODAL */}
            {showFinishConfirm && (
              <div className="modal-backdrop">
                <div className="modal-panel">
                  <h3>Submit Quiz</h3>
                  <p>Are you sure you want to submit the quiz? You won't be able to change answers after submitting.</p>
                  <div className="modal-actions">
                    <button className="modal-btn confirm" onClick={handleFinishConfirm}>Yes, Submit</button>
                    <button className="modal-btn" onClick={() => setShowFinishConfirm(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* RESULT MODAL */}
            {showResult && (
              <div className="modal-backdrop">
                <div className="modal-panel">
                  <h3>Congratulations</h3>
                  <p>You just completed your quiz.</p>
                  <div style={{ fontWeight: 700 }}>
                    <p>Score: {resultData.score} / {resultData.total}</p>
                    <p>Time taken: {formatTime(resultData.timeTaken)}</p>
                  </div>
                  <div className="modal-actions">
                    <button className="modal-btn confirm" onClick={() => { setShowResult(false); if (onSelect) onSelect(); }}>Close</button>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </>
    );
}




export function AttemptedTopicQuiz() {
  const { user } = useAuth();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/quiz-attempts`, {
          headers: {
            'Content-Type': 'application/json',
            ...(user && user._id ? { 'x-user-id': user._id } : {}),
          },
        });
        if (!res.ok) throw new Error('Failed to fetch attempts');
        const data = await res.json();
        if (mounted) setAttempts(data);
      } catch (err) {
        // fallback to localStorage
        try {
          const stored = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
          if (mounted) setAttempts(stored);
        } catch (e) {
          console.error('Failed to load attempts', e);
        }
        console.error('Failed to load attempts from backend', err);
      }
    };
    load();
    return () => { mounted = false; };
  }, [API_BASE, user]);

  const totalScore = attempts.reduce((acc, a) => acc + (a.score || 0), 0);
  const totalPossible = attempts.reduce((acc, a) => acc + (a.total || 0), 0);
  const percentage = totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0;

  return (
    <div className="attempted-topic-quiz__body">
      <div className="attempted-topic-quiz__container">
        <ol>
          <li>
            <p>Topic</p>
            <span className="attempted-topic-quiz__date">Date attempted</span>
            <span className="attempted-topic-quiz__score">Score</span>
          </li>

          {attempts.map((a, idx) => (
            <li key={idx}>
              <p>{a.topic}</p>
              <span className="attempted-topic-quiz__date">{new Date(a.attemptedAt || a.date || a.createdAt).toLocaleString()}</span>
              <span className="attempted-topic-quiz__score">{a.score} / {a.total}</span>
            </li>
          ))}
        </ol>

        <div className="attempted-topic-quiz__total">
          <p>Total</p>
          <span className="attempted-topic-quiz__percentage">{percentage}%</span>
          <span className="attempted-topic-quiz__total-score">{totalScore} / {totalPossible}</span>
        </div>
      </div>
    </div>
  );
}