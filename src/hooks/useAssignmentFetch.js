import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../services/apiClient';
import { logError } from '../utils/logger';

export function useAssignmentFetch() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      setAssignments(data);
    } catch (err) {
      logError('Failed to fetch assignments', { error: err.message });
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  return { assignments, loading, error, refetch: loadAssignments };
}
