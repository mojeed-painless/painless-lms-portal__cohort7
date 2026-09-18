import { useState, useEffect, useCallback } from 'react';
import { fetchJson } from '../services/apiClient';
import { logError } from '../utils/logger';
import {
  assignmentSubmissionSchema,
  assignmentGradeSchema,
  assignmentCreateSchema,
  assignmentUpdateSchema,
} from '../schemas/assignment';

export function useAssignments(token) {
  const [assignments, setAssignments] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [pending, setPending] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [graded, setGraded] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      const list = Array.isArray(data) ? data : data?.assignments || [];
      setAssignments(list);
      // Derive student-facing buckets
      setPending(list.filter((a) => a.status === 'pending'));
      setSubmitted(list.filter((a) => a.status === 'submitted'));
      setGraded(list.filter((a) => a.status === 'graded'));
    } catch (err) {
      logError('Failed to fetch assignments', { error: err.message });
      setAssignments([]);
      setError('Failed to fetch assignments');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments/admin/all', { headers: authHeaders });
      setAllAssignments(data?.assignments || []);
    } catch (err) {
      logError('Failed to fetch all assignments', { error: err.message });
      setAllAssignments([]);
      setError('Failed to fetch all assignments');
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  const fetchPendingAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      const list = Array.isArray(data) ? data : data?.assignments || [];
      setPending(list.filter((a) => a.status === 'pending'));
      return true;
    } catch (err) {
      logError('Failed to fetch pending assignments', { error: err?.message || err });
      setPending([]);
      setError('Failed to fetch assignments');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSubmittedAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      const list = Array.isArray(data) ? data : data?.assignments || [];
      setSubmitted(list.filter((a) => a.status === 'submitted'));
      return true;
    } catch (err) {
      logError('Failed to fetch submitted assignments', { error: err?.message || err });
      setSubmitted([]);
      setError('Failed to fetch assignments');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGradedAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments');
      const list = Array.isArray(data) ? data : data?.assignments || [];
      setGraded(list.filter((a) => a.status === 'graded'));
      return true;
    } catch (err) {
      logError('Failed to fetch graded assignments', { error: err?.message || err });
      setGraded([]);
      setError('Failed to fetch assignments');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Admin-specific submitted/graded endpoints
  const fetchSubmittedAssignmentsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments/admin/submitted', { headers: authHeaders });
      setSubmitted(data?.assignments || []);
      return true;
    } catch (err) {
      logError('Failed to fetch submitted assignments (admin)', { error: err?.message || err });
      setSubmitted([]);
      setError('Failed to fetch submitted assignments');
      return false;
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  const fetchGradedAssignmentsAdmin = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson('/assignments/admin/graded', { headers: authHeaders });
      setGraded(data?.assignments || []);
      return true;
    } catch (err) {
      logError('Failed to fetch graded assignments (admin)', { error: err?.message || err });
      setGraded([]);
      setError('Failed to fetch graded assignments');
      return false;
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  const extractZodMessage = (err) => {
    // Normalize common Zod/validation error shapes into a single human-friendly string
    try {
      if (!err) return null;
      // Zod v3: err.issues or err.errors
      const issues = err.issues || err.errors || null;
      if (Array.isArray(issues) && issues.length) return String(issues[0].message || issues[0]);

      // If an array was thrown directly
      if (Array.isArray(err) && err.length) return String(err[0].message || err[0]);

      // If it's an Error-like object with message
      if (typeof err === 'object' && err.message) {
        // message might contain a JSON array - try to parse and extract
        const msg = String(err.message);
        if (msg.trim().startsWith('[')) {
          try {
            const parsed = JSON.parse(msg);
            if (Array.isArray(parsed) && parsed.length) return String(parsed[0].message || parsed[0]);
          } catch (e) {
            // fallback to raw message
          }
        }
        return msg;
      }

      // If it's a JSON stringified array
      if (typeof err === 'string' && err.trim().startsWith('[')) {
        try {
          const parsed = JSON.parse(err);
          if (Array.isArray(parsed) && parsed.length) return String(parsed[0].message || parsed[0]);
        } catch (e) {
          // fallthrough
        }
      }

      // Fallback to string coercion
      return String(err);
    } catch (e) {
      return String(err);
    }
  };

  // Intentionally do not auto-fetch on mount; callers invoke `fetchAssignments()`
  // to control when loading should occur (tests expect no automatic fetch).

  const submitAssignment = async (assignmentId, payload) => {
    setLoading(true);
    setError(null);
    try {
      const validated = assignmentSubmissionSchema.parse(payload);
      return await fetchJson(`/assignments/${assignmentId}/submit`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(validated),
      });
    } catch (err) {
      const message = extractZodMessage(err);
      setError(message);
      logError('Assignment submission error', { error: message });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const gradeAssignment = async (submissionId, score, feedback = '') => {
    setLoading(true);
    setError(null);
    try {
      const validated = assignmentGradeSchema.parse({ score, feedback });
      await fetchJson(`/assignments/${submissionId}/grade`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(validated),
      });
      // refresh graded assignments if present (tests expect this path)
      if (token) {
        try {
          const data = await fetchJson('/assignments/admin/graded', { headers: authHeaders });
          setAllAssignments(data?.assignments || []);
        } catch (e) {
          // don't fail the grade result if refresh fails; surface the error message
          setError('Failed to fetch all assignments');
        }
      }
      return true;
    } catch (err) {
      const message = extractZodMessage(err);
      setError(message || (err.message || 'Failed to grade assignment'));
      logError('Assignment grading error', { error: message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateGrade = async (submissionId, score, feedback = '') => {
    // reuse gradeAssignment behavior
    return await gradeAssignment(submissionId, score, feedback);
  };

  const createAssignment = async (title, description, dueDate, courseType) => {
    setLoading(true);
    setError(null);
    try {
      const validated = assignmentCreateSchema.parse({ title, description, dueDate, courseType });
      await fetchJson('/assignments', {
        method: 'POST',
        headers: { ...authHeaders },
        body: JSON.stringify(validated),
      });
      // refresh admin list
      if (token) await fetchAllAssignments();
      return true;
    } catch (err) {
      const message = extractZodMessage(err);
      setError(message);
      logError('Create assignment error', { error: message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAssignment = async (id, title, description, dueDate, courseType) => {
    setLoading(true);
    setError(null);
    try {
      const validated = assignmentUpdateSchema.parse({ title, description, dueDate, courseType });
      await fetchJson(`/assignments/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders },
        body: JSON.stringify(validated),
      });
      if (token) await fetchAllAssignments();
      return true;
    } catch (err) {
      const message = extractZodMessage(err);
      setError(message);
      logError('Update assignment error', { error: message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAssignment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
      const res = await fetch(`${API_BASE_URL}/assignments/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
      });
      if (res.status === 204) {
        setAllAssignments(prev => prev.filter(a => a.id !== id && String(a.id) !== String(id)));
        return true;
      }
      const body = await res.json().catch(() => ({}));
      const message = body?.message || `Delete failed with status ${res.status}`;
      setError(message);
      logError('Delete assignment error', { error: message });
      return false;
    } catch (err) {
      const message = extractZodMessage(err);
      setError(message);
      logError('Delete assignment error', { error: message });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    assignments,
    allAssignments,
    pending,
    submitted,
    graded,
    loading,
    error,
    fetchAssignments,
    fetchAllAssignments,
    fetchPendingAssignments,
    fetchSubmittedAssignments,
    fetchGradedAssignments,
    fetchSubmittedAssignmentsAdmin,
    fetchGradedAssignmentsAdmin,
    submitAssignment,
    gradeAssignment,
    updateGrade,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}

export { useStudentAssignments } from './useStudentAssignments';
export { useAdminAssignmentsApi } from './useAdminAssignmentsApi';