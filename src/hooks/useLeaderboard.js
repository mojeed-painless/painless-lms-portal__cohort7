import { useState, useEffect } from 'react';
import { logError, logInfo } from '../utils/logger';

export function useLeaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [dailyQuizLeaders, setDailyQuizLeaders] = useState([]);
  const [authRequired, setAuthRequired] = useState(false);
  const [dailyQuizLoading, setDailyQuizLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/users/grades');
        if (response.status === 401) {
          setAuthRequired(true);
          return;
        }
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        setLeaders(Array.isArray(data) ? data : (data.users || []));
      } catch (err) {
        logError('Failed to fetch general leaderboard', { error: err && err.message ? err.message : err });
      }
    }

    async function fetchDailyQuizLeaders() {
      setDailyQuizLoading(true);
      try {
        const response = await fetch('/api/quiz-attempts/leaderboard/daily/aggregate');
        if (response.status === 401) {
          setAuthRequired(true);
          return;
        }
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        setDailyQuizLeaders(Array.isArray(data) ? data : (data.leaders || []));
        logInfo('Daily quiz leaders fetched successfully', { count: (Array.isArray(data) ? data.length : (data.leaders || []).length) });
      } catch (err) {
        logError('Failed to fetch daily quiz leaderboard', { error: err && err.message ? err.message : err });
      } finally {
        setDailyQuizLoading(false);
      }
    }

    fetchLeaderboard();
    fetchDailyQuizLeaders();
  }, []);

  return { leaders, dailyQuizLeaders, authRequired, dailyQuizLoading };
}
