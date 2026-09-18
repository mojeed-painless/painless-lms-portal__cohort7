import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// useAssignments uses fetchJson for many endpoints but deleteAssignment uses global.fetch
vi.mock('../services/apiClient', () => ({
  fetchJson: vi.fn(),
}));

import { useAssignments } from './useAssignments';

describe('useAssignments deleteAssignment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns true when delete returns 204', async () => {
    global.fetch = vi.fn(() => Promise.resolve({ status: 204 }));

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.deleteAssignment('123');
    });

    expect(ok).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('returns false and sets error when delete returns non-204 with message', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ message: 'Cannot delete' }),
      })
    );

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.deleteAssignment('999');
    });

    expect(ok).toBe(false);
    expect(result.current.error).toBe('Cannot delete');
  });

  it('uses status-based message when response has no JSON body', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 500,
        json: () => Promise.reject(new Error('no body')),
      })
    );

    const { result } = renderHook(() => useAssignments('token'));

    let deleteResult;
    await act(async () => {
      deleteResult = await result.current.deleteAssignment('1');
    });

    expect(deleteResult).toBe(false);
    expect(result.current.error).toBe('Delete failed with status 500');
  });
});
