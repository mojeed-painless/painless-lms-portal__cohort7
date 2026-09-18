import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// mock the apiClient module
vi.mock('../services/apiClient', () => ({
  fetchJson: vi.fn(),
}));

import { fetchJson } from '../services/apiClient';
import { useAssignmentFetch } from './useAssignmentFetch';

describe('useAssignmentFetch', () => {
  it('loads assignments on mount (success)', async () => {
    fetchJson.mockResolvedValueOnce([{ id: '1', title: 'Test Assignment' }]);

    const { result } = renderHook(() => useAssignmentFetch());

    // wait for the hook to finish loading
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toHaveLength(1);
    expect(result.current.assignments[0].title).toBe('Test Assignment');
    expect(result.current.error).toBeNull();
    expect(typeof result.current.refetch).toBe('function');
  });

  it('sets error when fetch fails', async () => {
    fetchJson.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useAssignmentFetch());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });
});
