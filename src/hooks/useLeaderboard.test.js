import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useLeaderboard } from './useLeaderboard';

beforeEach(() => {
  server.use(
    http.get('/api/users/grades', () => HttpResponse.json([{ id: '1', grade: 'A' }])),
    http.get('/api/quiz-attempts/leaderboard/daily/aggregate', () =>
      HttpResponse.json([{ id: '101', name: 'Alice', points: 50, rank: 1 }])
    )
  );
});

afterEach(() => server.resetHandlers());

describe('useLeaderboard Hook', () => {
  it('fetches and returns normalized leaderboard arrays', async () => {
    const { result } = renderHook(() => useLeaderboard());

    await waitFor(() => {
      expect(result.current.leaders).toHaveLength(1);
      expect(result.current.dailyQuizLeaders).toHaveLength(1);
      expect(result.current.dailyQuizLeaders[0]).toMatchObject({
        studentId: '101',
        name: 'Alice',
        score: 50,
        rank: 1,
      });
      expect(result.current.dailyQuizLoading).toBe(false);
      expect(result.current.authRequired).toBe(false);
    });
  });
});
