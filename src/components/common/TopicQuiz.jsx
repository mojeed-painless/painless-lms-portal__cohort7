import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/api';
import { 
  BookOpenText,
  Trophy,
  TimerReset,
  BadgeInfo,
  CalendarDays,
  MoveRight,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled, TbHexagonNumber3Filled } from 'react-icons/tb';

export default function TopicQuiz() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // ===== QUIZ STATES =====
  const [allTopicQuizzes, setAllTopicQuizzes] = useState([]); // All available quizzes
  const [selectedTopic, setSelectedTopic] = useState(null); // Currently selected topic for quiz
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResponses, setQuizResponses] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);
  
  // Attempted quizzes for user
  const [attemptedQuizzes, setAttemptedQuizzes] = useState({});
  
  // UI States
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [backendMessage, setBackendMessage] = useState('');

  // Fetch all topic quizzes from backend
  useEffect(() => {
    const fetchTopicQuizzes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quizzes/topic/list`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          // Group quizzes by topic/category
          setAllTopicQuizzes(data || []);
        }
      } catch (err) {
        console.warn('Could not fetch topic quizzes from backend:', err.message);
      }
    };

    fetchTopicQuizzes();
  }, []);

  // Fetch attempted quizzes for current user
  useEffect(() => {
    if (!user?.id && !user?._id) return;

    const fetchAttemptedQuizzes = async () => {
      try {
        const userId = user._id || user.id;
        const response = await fetch(
          `${API_BASE_URL}/api/quizzes/topic/attempts?userId=${userId}`,
          { credentials: 'include' }
        );
        
        if (response.ok) {
          const data = await response.json();
          // Create a map of topicId -> [attempts]
          const attemptsMap = {};
          data.forEach(attempt => {
            if (!attemptsMap[attempt.topicId]) {
              attemptsMap[attempt.topicId] = [];
            }
            attemptsMap[attempt.topicId].push(attempt);
          });
          setAttemptedQuizzes(attemptsMap);
        }
      } catch (err) {
        console.warn('Could not fetch attempted quizzes:', err.message);
      }
    };

    fetchAttemptedQuizzes();
  }, [user]);

  const handleSelectOption = (optionKey) => {
    setQuizResponses(prev => ({
      ...prev,
      [currentQuestionIndex]: optionKey
    }));
  };

  const isLastQuestion = selectedTopic && currentQuestionIndex === selectedTopic.questions.length - 1;

  const handleNextQuestion = () => {
    if (selectedTopic && currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = useCallback(() => {
    if (!selectedTopic) return { correctAnswers: 0, totalQuestions: 0, percentage: 0 };
    
    let correctCount = 0;
    
    Object.keys(quizResponses).forEach(questionIndex => {
      const question = selectedTopic.questions[parseInt(questionIndex)];
      if (question && quizResponses[questionIndex] === question.correctAnswer) {
        correctCount++;
      }
    });

    return {
      correctAnswers: correctCount,
      totalQuestions: selectedTopic.questions.length,
      percentage: Math.round((correctCount / selectedTopic.questions.length) * 100)
    };
  }, [quizResponses, selectedTopic]);

  const handleStartQuiz = useCallback((topic) => {
    const userAttempts = attemptedQuizzes[topic.id] || [];
    if (userAttempts.length > 0) {
      alert(`You have already completed the ${topic.name} quiz. It's a one-time attempt!`);
      return;
    }
    
    setSelectedTopic(topic);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setQuizResponses({});
    setQuizStartTime(new Date());
  }, [attemptedQuizzes]);

  // Auto-start quiz when ?topicId= is present in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicId = params.get('topicId');
    if (!topicId) return;
    if (!allTopicQuizzes || allTopicQuizzes.length === 0) return;

    const topic = allTopicQuizzes.find(q => String(q.id) === String(topicId));
    if (!topic) return;

    const userAttempts = attemptedQuizzes[topic.id] || [];
    if (userAttempts.length > 0) {
      setBackendMessage('You have already attempted this quiz.');
      // remove query param
      navigate(location.pathname, { replace: true });
      return;
    }

    handleStartQuiz(topic);
    // remove query param after starting
    navigate(location.pathname, { replace: true });
  }, [location.search, allTopicQuizzes, attemptedQuizzes, navigate, location.pathname, handleStartQuiz]);

  const handleFinishQuiz = useCallback(async () => {
    if (!quizStartTime || !selectedTopic) return;

    const endTime = new Date();
    const timeTaken = Math.round((endTime - quizStartTime) / 1000); // in seconds
    const score = calculateScore();

    // Resolve user id
    let studentId = user?.id;
    try {
      const resp = await fetch(`${API_BASE_URL}/api/users/me`, { credentials: 'include' });
      if (resp.ok) {
        const data = await resp.json();
        studentId = data._id || data.id || studentId;
      }
    } catch {
      // ignore
    }

    // Create quiz submission
    const responsesWithIds = {};
    Object.entries(quizResponses).forEach(([qIndex, answer]) => {
      const question = selectedTopic.questions[parseInt(qIndex)];
      if (question) {
        const questionId = question.id || question._id || qIndex;
        responsesWithIds[questionId] = answer;
      }
    });

    const studentName = user?.name || user?.fullName || user?.displayName || user?.username || 'Student';

    const quizSubmission = {
      topicId: selectedTopic.id,
      topicName: selectedTopic.name,
      topicCategory: selectedTopic.category,
      studentId: studentId,
      studentName: studentName,
      timeTaken: timeTaken,
      submittedAt: endTime.toISOString(),
      responses: responsesWithIds,
      correctAnswers: score.correctAnswers,
      totalQuestions: score.totalQuestions
    };

    // Submit to backend
    try {
      const submitResponse = await fetch(`${API_BASE_URL}/api/quizzes/topic/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(quizSubmission)
      });
      
      if (submitResponse.ok) {
        const submitData = await submitResponse.json();
        console.log('✅ Topic quiz submitted successfully:', submitData);
        
        // Update attempted quizzes list
        setAttemptedQuizzes(prev => ({
          ...prev,
          [selectedTopic.id]: [...(prev[selectedTopic.id] || []), quizSubmission]
        }));

        setSuccessMessage(`Quiz completed! You scored ${score.correctAnswers}/${score.totalQuestions}`);
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
    
    // End quiz session
    setQuizStarted(false);
    setSelectedTopic(null);
    setCurrentQuestionIndex(0);
    setQuizResponses({});
  }, [quizStartTime, calculateScore, selectedTopic, quizResponses, user]);

  

  // Show quiz session
  if (quizStarted && selectedTopic) {
    return (
      <div className="quiz__container">
        <div className="transcript__header">
          <div className="transcript__header-title">
            <h1><span><BookOpenText size={25}/></span> {selectedTopic.name} Quiz</h1>
            <p className="transcript__header-subtitle">{selectedTopic.category}</p>
          </div>
        </div>

        <div className="quiz__ready">
          <div className="quiz-session__container">
            <div className="quiz-session__header">
              <div className="quiz-session__question-number">
                <span>Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}</span>
              </div>
            </div>

            {selectedTopic.questions[currentQuestionIndex] && (
              <>
                {selectedTopic.questions[currentQuestionIndex].image && (
                  <div className="quiz-session__image">
                    <img src={selectedTopic.questions[currentQuestionIndex].image} alt="question" />
                  </div>
                )}

                <div className="quiz-session__question">
                  <h3>{selectedTopic.questions[currentQuestionIndex].question}</h3>
                </div>

                <div className="quiz-session__options">
                  {Object.entries(selectedTopic.questions[currentQuestionIndex].options).map(([key, value]) => (
                    <button 
                      key={`option-${currentQuestionIndex}-${key}`}
                      className={`quiz-option ${quizResponses[currentQuestionIndex] === key ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(key)}
                    >
                      <span className="option-circle">{key}</span>
                      <span className="option-content">{value}</span>
                    </button>
                  ))}
                </div>

                <div className="quiz-session__navigation" style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '24px'
                }}>
                  <button 
                    className="quiz-session__btn"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    style={{ opacity: currentQuestionIndex === 0 ? 0.5 : 1 }}
                  >
                    ← Previous
                  </button>
                  
                  {isLastQuestion ? (
                    <button 
                      className="quiz-session__submit-btn"
                      onClick={handleFinishQuiz}
                    >
                      Finish Quiz <span><CheckCircle size={16} /></span>
                    </button>
                  ) : (
                    <button 
                      className="quiz-session__submit-btn"
                      onClick={handleNextQuestion}
                    >
                      Next Question <span><MoveRight size={16} /></span>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show quiz list
  return (
    <div className="topic-quiz__container">
      <div className="transcript__header">
        <div className="transcript__header-title">
          <h1><span><BookOpenText size={25}/></span> Topic Quizzes</h1>
          <p className="transcript__header-subtitle">Test your knowledge on specific topics</p>
        </div>
      </div>

      {successMessage && (
        <div className="success-banner" style={{
          padding: '12px 20px',
          backgroundColor: '#d4edda',
          color: '#155724',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #c3e6cb'
        }}>
          {successMessage}
        </div>
      )}

      {backendMessage && (
        <div className="warning-banner" style={{
          padding: '12px 20px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #ffeeba'
        }}>
          {backendMessage}
        </div>
      )}

      <div className="quiz__article">
        {allTopicQuizzes.length > 0 ? (
          <div className="topic-quiz__list">
            {allTopicQuizzes.map((quiz) => {
              const userAttempts = attemptedQuizzes[quiz.id] || [];
              const hasAttempted = userAttempts.length > 0;
              
              return (
                <div 
                  key={quiz.id}
                  className="topic-quiz__item"
                  style={{
                    padding: '20px',
                    marginBottom: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0' }}>{quiz.name}</h3>
                      <small style={{ color: '#666' }}>{quiz.category} • {quiz.questions?.length || 0} questions</small>
                    </div>
                    {!hasAttempted ? (
                      <button 
                        onClick={() => handleStartQuiz(quiz)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Take Quiz
                      </button>
                    ) : (
                      <button 
                        onClick={() => setExpandedTopic(expandedTopic === quiz.id ? null : quiz.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#2196F3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        {expandedTopic === quiz.id ? 'Hide' : 'View'} Attempt ({userAttempts.length})
                      </button>
                    )}
                  </div>

                  {expandedTopic === quiz.id && userAttempts.length > 0 && (
                    <div style={{
                      marginTop: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      <h4>Your Attempts:</h4>
                      {userAttempts.map((attempt, attemptIdx) => (
                        <div key={attemptIdx} style={{
                          padding: '12px',
                          marginBottom: '8px',
                          backgroundColor: '#e8f5e9',
                          borderRadius: '4px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <strong>Attempt {attemptIdx + 1}</strong>
                            <span>Score: {attempt.correctAnswers}/{attempt.totalQuestions}</span>
                          </div>
                          <small style={{ color: '#555' }}>
                            Submitted: {new Date(attempt.submittedAt).toLocaleString()}
                          </small>
                          
                          <details style={{ marginTop: '8px' }}>
                            <summary style={{ cursor: 'pointer', fontWeight: '600' }}>View Answers</summary>
                            <div style={{ marginTop: '8px', paddingLeft: '8px' }}>
                              {quiz.questions?.map((question, qIdx) => {
                                const userAnswer = attempt.responses[qIdx];
                                const isCorrect = userAnswer === question.correctAnswer;
                                
                                return (
                                  <div key={qIdx} style={{
                                    padding: '8px',
                                    marginBottom: '8px',
                                    backgroundColor: isCorrect ? '#c8e6c9' : '#ffcdd2',
                                    borderRadius: '4px',
                                    borderLeft: `4px solid ${isCorrect ? '#4CAF50' : '#f44336'}`
                                  }}>
                                    <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Q{qIdx + 1}: {question.question}</p>
                                    <small style={{ display: 'block', marginBottom: '4px' }}>
                                      Your answer: <strong>{question.options[userAnswer] || 'Not answered'}</strong>
                                    </small>
                                    {!isCorrect && (
                                      <small style={{ display: 'block' }}>
                                        Correct answer: <strong>{question.options[question.correctAnswer]}</strong>
                                      </small>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ 
            padding: '40px', 
            textAlign: 'center', 
            color: '#999'
          }}>
            <AlertCircle size={48} style={{ margin: '0 auto 16px', display: 'block' }} />
            <p>No topic quizzes available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}