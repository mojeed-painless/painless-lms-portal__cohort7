import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useQuizSession } from './useQuizSession';

describe('useQuizSession Hook', () => {
  it('starts session successfully', async () => {
    server.use(
      http.post('*/api/quiz/session/react-101', () => {
        return HttpResponse.json({ sessionId: 'sess_123', status: 'active' });
      })
    );

    const { result } = renderHook(() => useQuizSession('react-101'));

    act(() => {
      result.current.startSession();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.session.sessionId).toBe('sess_123');
    expect(result.current.error).toBeNull();
  });

  it('falls back to client session when server returns no session', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () => {
        return HttpResponse.json({});
      })
    );

    const user = { token: 't' };
    const { result } = renderHook(() => useQuizSession(user));

    // Wait for effect to finish
    await waitFor(() => {
      expect(result.current.sessionLoading).toBe(false);
    });

    expect(result.current.dailySession).toBeTruthy();
    expect(result.current.dailySession._clientFallback).toBe(true);
    expect(result.current.timeLeft.beforeQuiz).toHaveProperty('seconds');
  });
});
