import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useDailyQuiz } from './useDailyQuiz';

const server = setupServer(
  http.get('/api/quizzes/q-1', () => HttpResponse.json({ id: 'q-1', title: 'Daily React Quiz' })),
  http.get('/api/quiz-attempts/leaderboard/daily/aggregate', () => HttpResponse.json([{ name: 'Alice', score: 10 }])),
  http.post('/api/quiz-attempts/submit', () => HttpResponse.json({ success: true, score: 100 }))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useDailyQuiz Hook', () => {
  it('fetches quiz data and daily leaderboard successfully', async () => {
    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.quizData.title).toBe('Daily React Quiz');
      expect(result.current.leaderboard).toHaveLength(1);
    });
  });

  it('handles submission logic accurately', async () => {
    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    let res;
    await act(async () => {
      res = await result.current.submitQuizAnswers({ q1: 'a' });
    });

    expect(res.success).toBe(true);
    expect(result.current.submissionResult.status).toBe('success');
  });
});
