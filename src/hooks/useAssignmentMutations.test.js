import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAssignmentMutations } from './useAssignmentMutations';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('useAssignmentMutations Hook', () => {
  it('submits valid assignment successfully', async () => {
    server.use(
      http.post('*/api/assignments/:id/submit', () => {
        return HttpResponse.json({ success: true, submissionId: 'sub_99' });
      })
    );

    const { result } = renderHook(() => useAssignmentMutations());
    const validPayload = { assignmentId: '123', content: 'Completed code answer' };

    await act(async () => {
      const res = await result.current.submitAssignment(validPayload);
      expect(res.success).toBe(true);
    });
  });

  it('rejects invalid payload via Zod validation', async () => {
    const { result } = renderHook(() => useAssignmentMutations());

    await expect(result.current.submitAssignment({ assignmentId: '' })).rejects.toThrow();
  });
});
