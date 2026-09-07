import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useAssignments } from './useAssignments';

describe('useAssignments Hook', () => {
  it('fetches assignments successfully on fetchAssignments()', async () => {
    const { result } = renderHook(() => useAssignments());

    expect(result.current.loading).toBe(false);
    expect(result.current.assignments).toEqual([]);

    act(() => {
      result.current.fetchAssignments();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toHaveLength(2);
    expect(result.current.assignments[0].title).toBe('React Fundamentals Quiz');
    expect(result.current.error).toBeNull();
  });

  it('handles server error when fetching assignments fails', async () => {
    // Override MSW default handler to return 500 error
    server.use(
      http.get('*/api/assignments', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useAssignments());

    act(() => {
      result.current.fetchAssignments();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch assignments');
  });

  it('submits assignment successfully', async () => {
    const { result } = renderHook(() => useAssignments());
    const payload = { answerText: 'Completed project submission' };

    let response;
    await act(async () => {
      response = await result.current.submitAssignment('1', payload);
    });

    expect(response.message).toBe('Assignment submitted successfully');
    expect(response.assignmentId).toBe('1');
    expect(result.current.error).toBeNull();
  });
});