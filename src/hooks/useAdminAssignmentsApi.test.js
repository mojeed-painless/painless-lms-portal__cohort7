import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../services/apiClient', () => ({
  fetchJson: vi.fn(),
}));

import { fetchJson } from '../services/apiClient';
import { useAdminAssignmentsApi } from './useAdminAssignmentsApi';

describe('useAdminAssignmentsApi', () => {
  it('saveScore calls fetchJson and toggles isGrading', async () => {
    fetchJson.mockResolvedValueOnce({ success: true });

    const { result } = renderHook(() => useAdminAssignmentsApi());

    // before call
    expect(result.current.isGrading).toBe(false);

    let response;
    await act(async () => {
      response = await result.current.saveScore('sub-1', 88);
    });

    expect(response).toEqual({ success: true });
    // after call, isGrading should be false
    expect(result.current.isGrading).toBe(false);

    // ensure fetchJson called with the expected endpoint and options
    expect(fetchJson).toHaveBeenCalledWith('/admin/submissions/sub-1/grade', {
      method: 'PATCH',
      body: JSON.stringify({ score: 88 }),
    });
  });
});
