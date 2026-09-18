import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useTopicQuizSubmission } from './useTopicQuizSubmission';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('useTopicQuizSubmission Hook', () => {
  it('validates and submits quiz attempt successfully', async () => {
    server.use(
      http.post('*/api/quiz-attempts', () =>
        HttpResponse.json({ success: true, attemptId: 'att_123' })
      )
    );

    const { result } = renderHook(() => useTopicQuizSubmission());

    const validPayload = {
      topic: 'React Hooks',
      score: 90,
      total: 10,
      timeTaken: 180,
      answers: [],
    };

    await act(async () => {
      const res = await result.current.submitAttempt(validPayload);
      expect(res.success).toBe(true);
    });
  });
});
