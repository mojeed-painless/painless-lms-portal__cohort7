import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useQuizSession } from './useQuizSession';

function isoWithOffset(msOffset = 0) {
  return new Date(Date.now() + msOffset).toISOString();
}

describe('useQuizSession', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with the quiz not live and not started', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: null }))
    );

    const { result } = renderHook(() => useQuizSession(null));

    await waitFor(() => {
      expect(result.current.sessionLoading).toBe(false);
    });

    expect(result.current.quizIsLive).toBe(false);
    expect(result.current.quizStarted).toBe(false);
  });

  it('is live when the server session window covers "now"', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () =>
        HttpResponse.json({
          session: {
            date: new Date().toISOString().slice(0, 10),
            startAt: isoWithOffset(-10_000),
            endAt: isoWithOffset(60_000),
          },
        })
      )
    );

    const { result } = renderHook(() => useQuizSession({ token: 'test-token' }));

    await waitFor(() => {
      expect(result.current.quizIsLive).toBe(true);
    });
    expect(result.current.dailySession).not.toBeNull();
  });

  it('is not live and counts down when the session window is in the future', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () =>
        HttpResponse.json({
          session: {
            date: new Date().toISOString().slice(0, 10),
            startAt: isoWithOffset(90 * 60 * 1000), // 90 minutes from now
            endAt: isoWithOffset(92 * 60 * 1000),
          },
        })
      )
    );

    const { result } = renderHook(() => useQuizSession(null));

    await waitFor(() => {
      expect(result.current.sessionLoading).toBe(false);
    });

    expect(result.current.quizIsLive).toBe(false);
    expect(result.current.timeLeft.beforeQuiz.hours).toBe(1);
  });

  it('setQuizStarted flips quizStarted to true', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: null }))
    );

    const { result } = renderHook(() => useQuizSession(null));

    await waitFor(() => {
      expect(result.current.sessionLoading).toBe(false);
    });

    act(() => {
      result.current.setQuizStarted(true);
    });

    expect(result.current.quizStarted).toBe(true);
  });

  it('counts down the during-quiz timer once live and started, and closes the window at zero', async () => {
    // Fixed, absolute timestamps computed once - the hook polls this endpoint
    // every 3s, and if we recomputed offsets from Date.now() on each poll,
    // advancing fake time would keep "refreshing" the window instead of
    // letting it expire.
    const fixedSession = {
      date: new Date().toISOString().slice(0, 10),
      startAt: isoWithOffset(-1_000),
      endAt: isoWithOffset(2_000), // ~2 seconds of live window left
    };
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: fixedSession }))
    );

    const { result } = renderHook(() => useQuizSession(null));

    await waitFor(() => {
      expect(result.current.quizIsLive).toBe(true);
    });

    act(() => {
      result.current.setQuizStarted(true);
    });

    // Flush the initial setTimeout(0) that seeds duringQuiz
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    // Advance past the ~2 second window so the countdown reaches zero
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(result.current.quizIsLive).toBe(false);
  });
});
