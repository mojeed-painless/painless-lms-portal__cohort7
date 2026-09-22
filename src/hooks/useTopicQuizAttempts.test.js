import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useTopicQuizAttempts } from './useTopicQuizAttempts';

const server = setupServer(
  http.get('/api/topics/topic-1/attempts', () => HttpResponse.json([{ id: 'att-1', score: 85 }]))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useTopicQuizAttempts Hook', () => {
  it('fetches previous topic attempts', async () => {
    const { result } = renderHook(() => useTopicQuizAttempts('topic-1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.attempts).toHaveLength(1);
    });
  });

  it('manages timer countdown execution', () => {
    const { result } = renderHook(() => useTopicQuizAttempts('topic-1'));

    act(() => {
      result.current.startTimer();
    });

    expect(result.current.timerActive).toBe(true);
  });
});
