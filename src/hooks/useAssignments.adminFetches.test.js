import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/apiClient', () => ({
  fetchJson: vi.fn(),
}));

import { fetchJson } from '../services/apiClient';
import { useAssignments } from './useAssignments';

describe('useAssignments admin fetchers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAllAssignments success populates allAssignments', async () => {
    fetchJson.mockResolvedValueOnce({ assignments: [{ id: 'a1' }] });

    const { result } = renderHook(() => useAssignments('token'));

    await act(async () => {
      await result.current.fetchAllAssignments();
    });

    expect(result.current.allAssignments).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchAllAssignments failure sets error and clears list', async () => {
    fetchJson.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useAssignments('token'));

    await act(async () => {
      await result.current.fetchAllAssignments();
    });

    expect(result.current.allAssignments).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch all assignments');
  });

  it('fetchSubmittedAssignmentsAdmin success sets submitted and returns true', async () => {
    fetchJson.mockResolvedValueOnce({ assignments: [{ id: 's1' }] });

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.fetchSubmittedAssignmentsAdmin();
    });

    expect(ok).toBe(true);
    expect(result.current.submitted).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchSubmittedAssignmentsAdmin failure clears submitted and returns false', async () => {
    fetchJson.mockRejectedValueOnce(new Error('boom'));

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.fetchSubmittedAssignmentsAdmin();
    });

    expect(ok).toBe(false);
    expect(result.current.submitted).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch submitted assignments');
  });

  it('fetchGradedAssignmentsAdmin success sets graded and returns true', async () => {
    fetchJson.mockResolvedValueOnce({ assignments: [{ id: 'g1' }] });

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.fetchGradedAssignmentsAdmin();
    });

    expect(ok).toBe(true);
    expect(result.current.graded).toHaveLength(1);
    expect(result.current.error).toBeNull();
  });

  it('fetchGradedAssignmentsAdmin failure clears graded and returns false', async () => {
    fetchJson.mockRejectedValueOnce(new Error('boom'));

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.fetchGradedAssignmentsAdmin();
    });

    expect(ok).toBe(false);
    expect(result.current.graded).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch graded assignments');
  });
});
