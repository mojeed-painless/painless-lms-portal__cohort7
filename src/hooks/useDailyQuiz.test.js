import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useDailyQuiz } from './useDailyQuiz';

beforeEach(() => {
  server.use(
    http.get('*/api/quizzes/q-1', () => HttpResponse.json({ id: 'q-1', title: 'Daily React Quiz' })),
    http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () =>
      HttpResponse.json([{ name: 'Alice', score: 10 }])
    ),
    http.post('*/api/quizzes/submit', () => HttpResponse.json({ success: true, score: 100 }))
  );
});

afterEach(() => server.resetHandlers());

describe('useDailyQuiz Hook', () => {
  it('fetches quiz data and daily leaderboard successfully', async () => {
    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.quizData.title).toBe('Daily React Quiz');
      expect(result.current.leaderboard).toHaveLength(1);
    });
  });

  it('falls back to a default quiz title when the quiz endpoint is unavailable', async () => {
    server.use(
      http.get('*/api/quizzes/q-1', () => new HttpResponse(null, { status: 404 })),
      http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () =>
        HttpResponse.json({ top: [{ name: 'Dana', score: 18 }] })
      )
    );

    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.quizData).toEqual({ id: 'q-1', title: 'Daily Quiz' });
      expect(result.current.leaderboard).toEqual([{ name: 'Dana', score: 18 }]);
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

  it('returns a conflict result when the quiz has already been submitted today', async () => {
    server.use(
      http.post('*/api/quizzes/submit', () =>
        HttpResponse.json({ message: 'Already submitted today' }, { status: 409 })
      )
    );

    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    let res;
    await act(async () => {
      res = await result.current.submitQuizAnswers({ q1: 'a' });
    });

    expect(res).toMatchObject({ success: false, status: 409 });
    expect(result.current.submissionResult).toMatchObject({
      status: 'conflict',
      message: 'Already submitted today',
    });
  });

  it('reports submission errors when the API rejects the attempt', async () => {
    server.use(
      http.post('*/api/quizzes/submit', () =>
        HttpResponse.json({ message: 'Submission failed' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useDailyQuiz('q-1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    let res;
    await act(async () => {
      res = await result.current.submitQuizAnswers({ q1: 'a' });
    });

    expect(res.success).toBe(false);
    expect(res.error).toBe('Submission failed');

    await waitFor(() => {
      expect(result.current.error).toBe('Submission failed');
    });
  });
});
