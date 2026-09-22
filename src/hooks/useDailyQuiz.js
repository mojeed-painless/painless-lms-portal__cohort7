import { useState, useEffect, useCallback } from 'react';
import { logError, logInfo } from '../utils/logger';

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
      const quizUrl = `/api/quizzes/${quizId}`;
      const leaderboardUrl = '/api/quiz-attempts/leaderboard/daily/aggregate';

      const [quizRes, leaderRes] = await Promise.all([
        fetch(quizUrl).catch(() => ({ ok: false, status: 404, json: async () => ({}) })),
        fetch(leaderboardUrl).catch(() => ({ ok: false, status: 404, json: async () => [] })),
      ]);

      if (quizRes.ok) {
        const quizJson = await quizRes.json();
        setQuizData(quizJson);
      } else if (quizId) {
        setQuizData({ id: quizId, title: 'Daily Quiz' });
      }

      if (leaderRes.ok) {
        const leaderJson = await leaderRes.json();
        setLeaderboard(Array.isArray(leaderJson) ? leaderJson : leaderJson?.top || []);
      }

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
      const response = await fetch('/api/quiz-attempts/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId, answers }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setSubmissionResult({ status: 'conflict', message: data.message || 'Already submitted today' });
        return { success: false, status: 409 };
      }

      if (!response.ok) {
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
