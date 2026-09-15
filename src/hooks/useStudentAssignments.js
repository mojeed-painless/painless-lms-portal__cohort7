import { useState, useEffect } from 'react';
import { assignmentSubmissionSchema } from '../schemas/assignment';
import { logError } from '../utils/logger';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Student-specific hook for fetching and submitting assignments.
 * Handles schema validation and error logging for student workflows.
 *
 * @returns {object} assignments, loading, error, submitAssignment, reload
 */
export function useStudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE}/assignments`);

      if (!response.ok) {
        throw new Error('Failed to fetch assignments');
      }

      const data = await response.json();
      setAssignments(data.assignments || data || []);
    } catch (err) {
      const message = err?.message || 'Error fetching student assignments';
      logError('Failed to fetch student assignments', { error: message });
      setError(message);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const submitAssignment = async (assignmentId, payload) => {
    try {
      setError(null);
      // Validate payload against schema before API call
      const validatedData = assignmentSubmissionSchema.parse(payload || {});

      const response = await fetch(`${API_BASE}/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit assignment');
      }

      const data = await response.json();
      // Refresh assignments after successful submission
      await loadAssignments();
      return data;
    } catch (err) {
      const message = err?.message || 'Error submitting assignment';
      logError('Assignment Submission Validation Failure', { error: message });
      setError(message);
      throw err;
    }
  };

  return {
    assignments,
    loading,
    error,
    submitAssignment,
    reload: loadAssignments,
  };
}
