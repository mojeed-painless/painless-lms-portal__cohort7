import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import * as apiClient from '../services/apiClient';
import * as loggerModule from '../utils/logger';
import { useAssignments } from './useAssignments';

describe('useAssignments Hook', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles fetch failure and logs error when the API rejects', async () => {
    const mockError = new Error('Network error: Unable to fetch assignments');
    const fetchSpy = vi.spyOn(apiClient, 'fetchJson').mockRejectedValueOnce(mockError);
    const logSpy = vi.spyOn(loggerModule, 'logError').mockImplementation(() => 'logged');

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      await result.current.fetchAssignments();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to fetch assignments');
    expect(fetchSpy).toHaveBeenCalledWith('/assignments');
    expect(logSpy).toHaveBeenCalledWith(
      'Failed to fetch assignments',
      expect.objectContaining({ error: mockError.message })
    );
  });

  it('rejects invalid assignment payloads and logs the validation error', async () => {
    const logSpy = vi.spyOn(loggerModule, 'logError').mockImplementation(() => 'logged');
    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      await expect(result.current.submitAssignment('1', { notes: 'Missing URL' })).rejects.toThrow();
    });

    expect(result.current.error).toBe('Submission URL is required');
    expect(result.current.loading).toBe(false);
    expect(logSpy).toHaveBeenCalledWith(
      'Assignment submission error',
      expect.objectContaining({ error: 'Submission URL is required' })
    );
  });

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

  it('handles object-style assignments response (data.assignments)', async () => {
    server.use(
      http.get('*/api/assignments', () => {
        return HttpResponse.json({ assignments: [{ id: '100', title: 'Obj Assignment' }] });
      })
    );

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      await result.current.fetchAssignments();
    });

    expect(result.current.assignments).toHaveLength(1);
    expect(result.current.assignments[0].id).toBe('100');
    expect(result.current.error).toBeNull();
  });

  it('handles server error when fetching assignments fails', async () => {
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
});
