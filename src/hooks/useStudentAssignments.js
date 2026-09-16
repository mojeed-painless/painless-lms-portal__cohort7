import { useState, useEffect } from 'react';
import { fetchJson } from '../services/apiClient';
import { assignmentSubmissionSchema } from '../schemas/assignment';

export function useStudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      setAssignments(Array.isArray(data) ? data : data?.assignments || []);
    } catch (err) {
      setAssignments([]);
      setError(err?.message || 'Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAssignment = async (payload) => {
    const validated = assignmentSubmissionSchema.parse(payload);
    return await fetchJson(`/assignments/${validated.assignmentId}/submit`, {
      method: 'POST',
      body: JSON.stringify(validated),
    });
  };

  return { assignments, loading, error, submitAssignment, refresh: fetchStudentAssignments };
}

export default useStudentAssignments;
