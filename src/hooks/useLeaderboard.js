import { useState, useEffect } from 'react';
import { leaderboardResponseSchema } from '../schemas/leaderboard';
import { logError, logInfo } from '../utils/logger';

function normalizeLeaderboardEntry(entry = {}) {
  const numericScore = Number(entry.score ?? entry.points ?? 0);
  const numericTotal = Number(entry.total ?? entry.score ?? entry.points ?? 0);
  const numericRank = Number(entry.rank ?? 1);

  return {
    rank: Number.isFinite(numericRank) ? numericRank : 0,
    studentId: entry.studentId ?? entry.id ?? '',
    name: entry.name ?? entry.studentName ?? 'Unknown',
    score: Number.isFinite(numericScore) ? numericScore : 0,
    total: Number.isFinite(numericTotal) ? numericTotal : 0,
  };
}

export function useLeaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [dailyQuizLeaders, setDailyQuizLeaders] = useState([]);
  const [authRequired, setAuthRequired] = useState(false);
  const [dailyQuizLoading, setDailyQuizLoading] = useState(true);
  const [validationError, setValidationError] = useState(null);

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
        const normalized = Array.isArray(data) ? data.map(normalizeLeaderboardEntry) : [];
        const parseResult = leaderboardResponseSchema.safeParse(normalized);

        if (!parseResult.success) {
          logError('Leaderboard schema validation failed', {
            errors: parseResult.error.format(),
          });
          setValidationError('Invalid data structure received from server');
          setDailyQuizLeaders([]);
          return;
        }

        setDailyQuizLeaders(parseResult.data);
        setValidationError(null);
        logInfo('Daily quiz leaders fetched and validated successfully', {
          count: parseResult.data.length,
        });
      } catch (err) {
        logError('Failed to fetch daily quiz leaderboard', { error: err && err.message ? err.message : err });
      } finally {
        setDailyQuizLoading(false);
      }
    }

    fetchLeaderboard();
    fetchDailyQuizLeaders();
  }, []);

  return { leaders, dailyQuizLeaders, authRequired, dailyQuizLoading, validationError };
}
