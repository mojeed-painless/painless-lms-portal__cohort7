import { useState, useEffect } from 'react';
import '../../assets/styles/topicQuiz.css';
import { useTopicQuizAttempts } from '../../hooks/useTopicQuizAttempts';
import useTopicQuizSubmission from '../../hooks/useTopicQuizSubmission';
import { useTopicQuizState } from '../../hooks/useTopicQuizState';
import TopicQuizView from './TopicQuizView';
import { useAuth } from '../../context/AuthContext';

function GenericTopicQuiz({ questions, topic = 'Quiz', onComplete }) {
  const { currentQuestion, selectedAnswers, score, isFinished, selectOption, nextQuestion } =
    useTopicQuizState(questions);
  const [submissionState, setSubmissionState] = useState({ status: 'idle', message: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { submitAttempt } = useTopicQuizSubmission();

  const handleSubmit = async () => {
    const total = questions.length;
    const calculatedScore = score || 0;

    const answers = Object.keys(selectedAnswers).map((qid) => {
      const question = questions.find((q) => String(q.id) === String(qid));
      return {
        questionId: Number(qid),
        selectedOption: Number(selectedAnswers[qid]),
        correctAnswer:
          typeof question?.correctAnswer !== 'undefined' ? Number(question.correctAnswer) : 0,
      };
    });

    try {
      setError('');
      const payload = {
        topic: String(topic || 'quiz'),
        score: Math.min(100, Math.round((calculatedScore / Math.max(total, 1)) * 100)),
        total,
        timeTaken: 0,
        answers,
      };
      const data = await submitAttempt(payload);
      const passed = typeof data?.passed === 'boolean' ? data.passed : calculatedScore === total;
      const nextResult = {
        score: calculatedScore,
        total,
        passed,
        status: data?.status || 'success',
      };
      setResult(nextResult);
      if (onComplete) onComplete(nextResult);
      setSubmissionState({ status: 'success', message: passed ? 'Passed' : 'Completed' });
    } catch (err) {
      setSubmissionState({ status: 'error', message: err?.message || 'Error submitting quiz' });
      setResult(null);
    }
  };

  return (
    <TopicQuizView
      topic={topic}
      currentQuestion={currentQuestion}
      selectedAnswers={selectedAnswers}
      onSelect={selectOption}
      onSubmit={handleSubmit}
      result={result}
      submissionState={submissionState}
      error={error}
    />
  );
}

export default function TopicQuiz({ currentTopic, topic, questions: providedQuestions, onSelect, onComplete }) {
  const resolvedTopic = currentTopic || topic;
  const hasCustomQuestions = Array.isArray(providedQuestions) && providedQuestions.length > 0;
  const {
    attempts,
    timeLeft,
    timerActive,
    loading,
    startTimer,
  } = useTopicQuizAttempts(resolvedTopic || null);

  if (hasCustomQuestions) {
    return <GenericTopicQuiz questions={providedQuestions} topic={resolvedTopic} onComplete={onComplete} />;
  }

  if (loading) return <div>Loading topic attempts...</div>;

  return (
    <div className="topic-quiz-wrapper">
      <h2>{resolvedTopic}</h2>
      <div className="timer-display">
        Time Remaining: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      {!timerActive && <button onClick={startTimer}>Start Quiz Timer</button>}

      <section className="attempts-history">
        <h4>Previous Attempts</h4>
        <ul>
          {attempts.length ? (
            attempts.map((att) => (
              <li key={att.id || att._id || `${att.score}-${att.topic}`}>
                Score: {att.score}%
              </li>
            ))
          ) : (
            <li>No attempts yet.</li>
          )}
        </ul>
      </section>

      {onSelect && (
        <button type="button" onClick={onSelect} className="take-quiz-btn">
          Close
        </button>
      )}
    </div>
  );
}

export function AttemptedTopicQuiz() {
  const { user } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
        const stored = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
        if (mounted) setAttempts(stored);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [API_BASE, user]);

  const totalScore = attempts.reduce((acc, a) => acc + (a.score || 0), 0);
  const totalPossible = attempts.reduce((acc, a) => acc + (a.total || 0), 0);
  const percentage = totalPossible ? Math.round((totalScore / totalPossible) * 100) : 0;

  return (
    <div className="attempted-topic-quiz__body">
      <div className="quiz__average">
        <p>Average Score:</p>
        <span>{percentage}%</span>
      </div>
      <div className="attempted-topic-quiz__container">
        <ol>
          <li>
            <p>Topic</p>
            <span className="attempted-topic-quiz__score">Score</span>
          </li>
          {attempts.map((a, idx) => (
            <li key={idx}>
              <p>{a.topic}</p>
              <span className="attempted-topic-quiz__score">
                {a.score} / {a.total}
              </span>
            </li>
          ))}
        </ol>
        <div className="attempted-topic-quiz__total">
          <p>Total</p>
          <span className="attempted-topic-quiz__total-score">
            {totalScore} / {totalPossible}
          </span>
        </div>
      </div>
    </div>
  );
}
