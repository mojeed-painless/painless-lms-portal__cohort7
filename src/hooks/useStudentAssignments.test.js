import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useStudentAssignments } from './useStudentAssignments';

describe('useStudentAssignments Hook', () => {
  it('fetches student assignments on mount', async () => {
    // Mock the API response
    server.use(
      http.get('*/api/assignments', () => {
        return HttpResponse.json({
          assignments: [
            { id: 1, title: 'Assignment 1', description: 'Test' },
            { id: 2, title: 'Assignment 2', description: 'Test 2' },
          ],
        });
      })
    );

    const { result } = renderHook(() => useStudentAssignments());

    // Initially should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.assignments.length).toBe(0);

    // Wait for assignments to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(Array.isArray(result.current.assignments)).toBe(true);
    expect(result.current.assignments.length).toBe(2);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch error gracefully', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useStudentAssignments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).not.toBe(null);
    expect(result.current.assignments).toStrictEqual([]);
  });

  it('submits assignment with validation', async () => {
    server.use(
      http.post('*/api/assignments/:id/submit', () => {
        return HttpResponse.json({ success: true });
      })
    );

    const { result } = renderHook(() => useStudentAssignments());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      const response = await result.current.submitAssignment(1, {
        submissionUrl: 'https://github.com/user/repo',
        notes: 'Completed the assignment',
      });

      expect(response).toBeDefined();
      expect(response.success).toBe(true);
    });
  });
});
