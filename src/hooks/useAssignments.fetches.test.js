import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useAssignments } from './useAssignments';

describe('useAssignments fetchers', () => {
  it('fetchPendingAssignments handles array response and returns true', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return HttpResponse.json([
          { id: '1', status: 'pending' },
          { id: '2', status: 'submitted' },
        ]);
      })
    );

    const { result } = renderHook(() => useAssignments());

    let ok;
    await act(async () => {
      ok = await result.current.fetchPendingAssignments();
    });

    expect(ok).toBe(true);
    expect(result.current.pending).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchSubmittedAssignments handles array response and returns true', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return HttpResponse.json([
          { id: '10', status: 'submitted' },
          { id: '11', status: 'graded' },
        ]);
      })
    );

    const { result } = renderHook(() => useAssignments());

    let ok;
    await act(async () => {
      ok = await result.current.fetchSubmittedAssignments();
    });

    expect(ok).toBe(true);
    expect(result.current.submitted).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchGradedAssignments handles array response and returns true', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return HttpResponse.json([
          { id: '20', status: 'graded' },
          { id: '21', status: 'pending' },
        ]);
      })
    );

    const { result } = renderHook(() => useAssignments());

    let ok;
    await act(async () => {
      ok = await result.current.fetchGradedAssignments();
    });

    expect(ok).toBe(true);
    expect(result.current.graded).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('returns false and clears lists when server returns error for fetchers', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useAssignments());

    let okPending;
    await act(async () => {
      okPending = await result.current.fetchPendingAssignments();
    });
    expect(okPending).toBe(false);
    expect(result.current.pending).toHaveLength(0);

    let okSubmitted;
    await act(async () => {
      okSubmitted = await result.current.fetchSubmittedAssignments();
    });
    expect(okSubmitted).toBe(false);
    expect(result.current.submitted).toHaveLength(0);

    let okGraded;
    await act(async () => {
      okGraded = await result.current.fetchGradedAssignments();
    });
    expect(okGraded).toBe(false);
    expect(result.current.graded).toHaveLength(0);

    expect(result.current.error).toBe('Failed to fetch assignments');
  });
});
