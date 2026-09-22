import { useState, useEffect, useCallback } from 'react';
import { logError, logInfo } from '../utils/logger';
import { fetchQuiz, fetchLeaderboard, submitQuizAnswer } from '../services/quizApi';

export function useDailyQuiz(quizId) {
  const [quizData, setQuizData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const fetchQuizAndLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [quizJson, leaderJson] = await Promise.all([
        fetchQuiz(quizId).catch(() => ({ id: quizId, title: 'Daily Quiz' })),
        fetchLeaderboard().catch(() => []),
      ]);

      setQuizData(quizJson || { id: quizId, title: 'Daily Quiz' });
      setLeaderboard(Array.isArray(leaderJson) ? leaderJson : leaderJson?.top || []);
      logInfo('Daily quiz and leaderboard loaded successfully', { quizId });
    } catch (err) {
      logError('Failed loading daily quiz state', { error: err.message, quizId });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    if (quizId) {
      fetchQuizAndLeaderboard();
    }
  }, [quizId, fetchQuizAndLeaderboard]);

  const submitQuizAnswers = async (answers) => {
    setSubmitting(true);
    try {
      const data = await submitQuizAnswer(quizId, answers);

      if (data && data.status === 409) {
        setSubmissionResult({ status: 'conflict', message: data.message || 'Already submitted today' });
        return { success: false, status: 409 };
      }

      if (data && data.success === false) {
        throw new Error(data.message || 'Submission failed');
      }

      setSubmissionResult({ status: 'success', data });
      logInfo('Quiz submitted successfully', { quizId, score: data.score });
      return { success: true, data };
    } catch (err) {
      logError('Error submitting quiz answers', { quizId, error: err.message });
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    quizData,
    leaderboard,
    loading,
    submitting,
    error,
    submissionResult,
    submitQuizAnswers,
    refetch: fetchQuizAndLeaderboard,
  };
}

export default useDailyQuiz;
