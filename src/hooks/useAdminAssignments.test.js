import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useAdminAssignments } from './useAdminAssignments';

describe('useAdminAssignments Hook', () => {
  it('creates assignment with validation', async () => {
    server.use(
      http.post('*/api/assignments', () => {
        return HttpResponse.json({ id: 'new_1', title: 'Test Assignment' });
      })
    );

    const { result } = renderHook(() => useAdminAssignments());

    let response;
    await act(async () => {
      response = await result.current.createAssignment(
        'Test Assignment',
        'Description',
        '2026-12-31',
        'react'
      );
    });

    expect(response).toBeDefined();
    expect(response.id).toBe('new_1');
    expect(result.current.error).toBe(null);
  });

  it('handles assignment creation error', async () => {
    server.use(
      http.post('*/api/assignments', () => {
        return new HttpResponse(null, { status: 400 });
      })
    );

    const { result } = renderHook(() => useAdminAssignments());

    await act(async () => {
      try {
        await result.current.createAssignment('Test', 'Desc', '2026-12-31', 'react');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    expect(result.current.error).not.toBe(null);
  });

  it('grades submission with validation', async () => {
    server.use(
      http.put('*/api/assignments/:id/grade', () => {
        return HttpResponse.json({ success: true, score: 95 });
      })
    );

    const { result } = renderHook(() => useAdminAssignments());

    expect(result.current.gradingLoading).toBe(false);

    let response;
    await act(async () => {
      response = await result.current.gradeSubmission('sub_101', 95, 'Good work!');
    });

    expect(response?.success).toBe(true);
    expect(result.current.gradingLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles grading error and sets loading to false', async () => {
    server.use(
      http.put('*/api/assignments/:id/grade', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useAdminAssignments());

    await act(async () => {
      try {
        await result.current.gradeSubmission('sub_101', 95, 'Good work!');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    expect(result.current.gradingLoading).toBe(false);
    expect(result.current.error).not.toBe(null);
  });
});
