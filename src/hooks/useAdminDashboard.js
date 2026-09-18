import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchAllUsers } from '../services/adminApi';
import { logError } from '../utils/logger';

export function useAdminDashboard() {
  const { user } = useAuth();
  const activeUser =
    user ||
    (typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userInfo') || 'null')
      : null);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshUsers = useCallback(async () => {
    if (!activeUser || activeUser.role !== 'admin') {
      setUsers([]);
      setLoading(false);
      setError(null);
      return [];
    }

    setLoading(true);

    try {
      const data = await fetchAllUsers(activeUser.token);
      const usersArray = Array.isArray(data) ? data : data.users || [];

      const normalized = usersArray.map((u) => ({
        _id: u._id || u.id,
        firstName: u.firstName || u.first_name || u.first || '',
        lastName: u.lastName || u.last_name || u.last || '',
        email: u.email || u.emailAddress || '',
        role: u.role || 'student',
        isApproved: typeof u.isApproved === 'boolean' ? u.isApproved : !!u.approved,
        htmlAccess:
          typeof u.htmlAccess === 'boolean'
            ? u.htmlAccess
            : Array.isArray(u.courseAccess)
              ? u.courseAccess.includes('html')
              : !!u.htmlAccess,
        jsAccess:
          typeof u.jsAccess === 'boolean'
            ? u.jsAccess
            : Array.isArray(u.courseAccess)
              ? u.courseAccess.includes('js')
              : !!u.jsAccess,
        reactAccess:
          typeof u.reactAccess === 'boolean'
            ? u.reactAccess
            : Array.isArray(u.courseAccess)
              ? u.courseAccess.includes('react')
              : !!u.reactAccess,
      }));

      const approvedUsers = normalized.filter((u) => u.isApproved && u._id !== activeUser._id);
      setUsers(approvedUsers);
      setError(null);
      return approvedUsers;
    } catch (err) {
      const message = err?.message || 'Failed to fetch user data.';
      logError('Failed to load admin dashboard users', { error: message });
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [activeUser]);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return { users, loading, error, refreshUsers };
}
