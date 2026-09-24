import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useTopicQuizAttempts } from './useTopicQuizAttempts';

beforeEach(() => {
  server.use(
    http.get('*/api/topics/test-topic/attempts', () =>
      HttpResponse.json({
        attempts: [
          { id: 'a1', score: 80, completedAt: '2024-01-01T12:00:00Z' },
          { id: 'a2', score: 90, completedAt: '2024-01-02T12:00:00Z' },
        ],
      })
    ),
    http.get('*/api/topics/test-topic/timer', () =>
      HttpResponse.json({ timeRemaining: 300 })
    )
  );
});

afterEach(() => server.resetHandlers());

describe('useTopicQuizAttempts Hook', () => {
  it('fetches previous topic attempts', async () => {
    const { result } = renderHook(() => useTopicQuizAttempts('test-topic'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.attempts).toHaveLength(2);
    });
  });

  it('manages timer countdown execution', () => {
    const { result } = renderHook(() => useTopicQuizAttempts('test-topic'));

    act(() => {
      result.current.startTimer();
    });

    expect(result.current.timerActive).toBe(true);
  });
});
