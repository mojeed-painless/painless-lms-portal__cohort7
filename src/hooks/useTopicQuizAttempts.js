import { useState, useEffect } from 'react';
import { logError, logInfo } from '../utils/logger';
import { fetchTopicAttempts } from '../services/quizApi';

export function useTopicQuizAttempts(topicId) {
  const [attempts, setAttempts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttempts() {
      setLoading(true);
      try {
        const data = await fetchTopicAttempts(topicId);
        const attemptsList = Array.isArray(data)
          ? data
          : Array.isArray(data?.attempts)
            ? data.attempts
            : [];
        setAttempts(attemptsList);
        logInfo('Topic quiz attempts loaded', { topicId, count: attemptsList.length });
      } catch (err) {
        logError('Failed fetching topic quiz attempts', { topicId, error: err.message });
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    }

    if (topicId) {
      fetchAttempts();
    }
  }, [topicId]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const startTimer = () => setTimerActive(true);
  const resetTimer = (seconds = 300) => {
    setTimeLeft(seconds);
    setTimerActive(false);
  };

  return {
    attempts,
    timeLeft,
    timerActive,
    loading,
    startTimer,
    resetTimer,
  };
}
