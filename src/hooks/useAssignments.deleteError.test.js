import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { useAssignments } from './useAssignments';

describe('useAssignments deleteAssignment network error', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles fetch throwing (network error) and sets error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('network fail')));

    const { result } = renderHook(() => useAssignments('token'));

    let ok;
    await act(async () => {
      ok = await result.current.deleteAssignment('5');
    });

    expect(ok).toBe(false);
    expect(result.current.error).toBe('network fail');
  });
});
