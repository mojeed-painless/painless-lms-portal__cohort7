import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAuth } from '../context/AuthContext';
import { fetchAllUsers } from '../services/adminApi';
import { useAdminDashboard } from './useAdminDashboard';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('../services/adminApi', () => ({
  fetchAllUsers: vi.fn(),
}));

vi.mock('../utils/logger', () => ({
  logError: vi.fn(),
}));

describe('useAdminDashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns empty state when the current user is not an admin', async () => {
    useAuth.mockReturnValue({ user: { role: 'student' } });

    const { result } = renderHook(() => useAdminDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(fetchAllUsers).not.toHaveBeenCalled();
  });

  it('loads and normalizes approved admin users from the API response', async () => {
    useAuth.mockReturnValue({
      user: { _id: 'admin-1', role: 'admin', token: 'token-123' },
    });

    fetchAllUsers.mockResolvedValue({
      users: [
        {
          _id: 'student-1',
          firstName: 'Ada',
          lastName: 'Lovelace',
          email: 'ada@example.com',
          role: 'student',
          approved: true,
          courseAccess: ['html', 'js'],
        },
        {
          _id: 'student-2',
          firstName: 'Grace',
          lastName: 'Hopper',
          email: 'grace@example.com',
          role: 'student',
          approved: false,
          courseAccess: ['react'],
        },
        {
          _id: 'admin-1',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          role: 'admin',
          approved: true,
          courseAccess: ['html'],
        },
      ],
    });

    const { result } = renderHook(() => useAdminDashboard());

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
    });

    expect(fetchAllUsers).toHaveBeenCalledWith('token-123');
    expect(result.current.users[0]).toMatchObject({
      _id: 'student-1',
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      role: 'student',
      isApproved: true,
      htmlAccess: true,
      jsAccess: true,
      reactAccess: false,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('falls back to localStorage and surfaces API errors when the fetch fails', async () => {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ _id: 'admin-2', role: 'admin', token: 'stored-token' })
    );
    useAuth.mockReturnValue({ user: null });
    fetchAllUsers.mockRejectedValue(new Error('network down'));

    const { result } = renderHook(() => useAdminDashboard());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(fetchAllUsers).toHaveBeenCalledWith('stored-token');
    expect(result.current.error).toBe('network down');
    expect(result.current.users).toEqual([]);
  });

  it('maps legacy user objects and excludes the active admin while preserving access flags', async () => {
    useAuth.mockReturnValue({
      user: { _id: 'admin-1', role: 'admin', token: 'token-legacy' },
    });

    fetchAllUsers.mockResolvedValue({
      users: [
        {
          id: 'user-2',
          first_name: 'Legacy',
          last_name: 'User',
          emailAddress: 'legacy@example.com',
          approved: true,
          courseAccess: ['html', 'js'],
        },
        {
          _id: 'admin-1',
          firstName: 'Self',
          email: 'self@example.com',
          isApproved: true,
          htmlAccess: true,
          jsAccess: true,
          reactAccess: true,
        },
        {
          first: 'Fallback',
          last: 'Name',
          email: 'fallback@example.com',
          role: 'student',
          isApproved: false,
          htmlAccess: false,
          jsAccess: false,
          reactAccess: false,
        },
      ],
    });

    const { result } = renderHook(() => useAdminDashboard());

    await waitFor(() => {
      expect(result.current.users).toHaveLength(1);
    });

    expect(result.current.users[0]).toMatchObject({
      _id: 'user-2',
      firstName: 'Legacy',
      lastName: 'User',
      email: 'legacy@example.com',
      role: 'student',
      isApproved: true,
      htmlAccess: true,
      jsAccess: true,
      reactAccess: false,
    });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
