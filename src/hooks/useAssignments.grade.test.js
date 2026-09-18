import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../services/apiClient', () => ({
  fetchJson: vi.fn(),
}));

import { fetchJson } from '../services/apiClient';
import { useAssignments } from './useAssignments';

describe('useAssignments gradeAssignment admin refresh behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets error when admin refresh fails after grading but still returns true', async () => {
    // first call: grade endpoint -> succeed
    // second call: admin graded refresh -> fail
    fetchJson.mockImplementation((path) => {
      // match admin graded refresh first
      if (String(path).includes('/assignments/admin/graded')) return Promise.reject(new Error('refresh failed'));
      // match submission grade endpoint precisely
      if (String(path).match(/\/submissions\/.+\/grade$/)) return Promise.resolve({ success: true });
      return Promise.resolve({});
    });

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.gradeAssignment('sub-1', 90, 'Good');
    });

    expect(ok).toBe(true);
    expect(result.current.error).toBe('Failed to fetch all assignments');
  });

  it('refreshes allAssignments when admin refresh succeeds', async () => {
    fetchJson.mockImplementation((path) => {
      if (String(path).includes('/assignments/admin/graded')) return Promise.resolve({ assignments: [{ id: 'g1' }] });
      if (String(path).match(/\/submissions\/.+\/grade$/)) return Promise.resolve({ success: true });
      return Promise.resolve({});
    });

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.gradeAssignment('sub-2', 75, 'Nice');
    });

    expect(ok).toBe(true);
    await waitFor(() => {
      expect(result.current.allAssignments).toHaveLength(1);
    });
    expect(result.current.error).toBeNull();
  });
});
