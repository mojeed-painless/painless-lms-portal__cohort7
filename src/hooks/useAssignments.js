import { useState, useCallback } from 'react';
import {
  assignmentSubmissionSchema,
  assignmentGradeSchema,
  assignmentCreateSchema,
  assignmentUpdateSchema,
} from '../schemas/assignment';
import { z } from 'zod';
import { logError } from '../utils/logger';

// Use a stable base that works with MSW (relative '/api') or an absolute URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Helper function to extract error message from Zod validation errors
 */
const getZodErrorMessage = (err) => {
  if (!(err instanceof z.ZodError)) {
    return err.message || 'Validation failed';
  }
  
  // Try to get the message from the first error
  if (err.issues && err.issues.length > 0) {
    return err.issues[0].message || 'Validation failed';
  }
  
  return 'Validation failed';
};

export const useAssignments = (token) => {
  const [pending, setPending] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [graded, setGraded] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Helper function to convert courseType to courseId
  const getCourseId = (courseType) => {
    const courseMap = {
      'html': 'html',
      'css': 'css',
      'js': 'javascript',
      'react': 'react',
    };
    return courseMap[courseType] || courseType;
  };

  const handleError = (err) => {
    const message = err.response?.data?.message || err.message;
    setError(message);
    logError('Assignment error', { message });
  };

  // STUDENT ENDPOINTS
  // Generic public fetch used by tests and student views
  const fetchAssignments = useCallback(() => {
    // Make the loading state observable synchronously
    setLoading(true);
    setError(null);

    // Perform the fetch asynchronously so tests can observe loading=true
    setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/assignments`);
        if (!res.ok) {
          setAssignments([]);
          setError('Failed to fetch assignments');
          return;
        }
        const data = await res.json();
        setAssignments(data.assignments || data || []);
      } catch (err) {
        setAssignments([]);
        setError(err?.message || 'Failed to fetch assignments');
      } finally {
        setLoading(false);
      }
    }, 0);
  }, []);

  const fetchPendingAssignments = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/student/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPending(data.assignments || []);
    } catch (err) {
      handleError(err);
      setPending([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchSubmittedAssignments = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/student/submitted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubmitted(data.assignments || []);
    } catch (err) {
      handleError(err);
      setSubmitted([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchGradedAssignments = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/student/graded`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGraded(data.assignments || []);
    } catch (err) {
      handleError(err);
      setGraded([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const submitAssignment = useCallback(
    async (studentAssignmentId, payload) => {
      setLoading(true);
      setError(null);
      try {
        // Validate payload against schema before API call
        const validatedPayload = assignmentSubmissionSchema.parse(payload || {});

        const response = await fetch(
          `${API_BASE}/assignments/${studentAssignmentId}/submit`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(validatedPayload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to submit assignment');
        }

        const data = await response.json().catch(() => ({}));
        // Optionally refresh submitted list when token present
        if (token) await fetchSubmittedAssignments();
        return data;
      } catch (err) {
        const msg = getZodErrorMessage(err);
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchSubmittedAssignments]
  );

  // ADMIN ENDPOINTS
  const fetchSubmittedAssignmentsAdmin = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/admin/submitted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSubmitted(data.assignments || []);
    } catch (err) {
      handleError(err);
      setSubmitted([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchGradedAssignmentsAdmin = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/admin/graded`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGraded(data.assignments || []);
    } catch (err) {
      handleError(err);
      setGraded([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const gradeAssignment = useCallback(
    async (studentAssignmentId, score, feedback = '') => {
      setLoading(true);
      setError(null);
      try {
        // Validate payload against schema before API call
        const validatedPayload = assignmentGradeSchema.parse({ score, feedback });

        const response = await fetch(
          `${API_BASE}/assignments/${studentAssignmentId}/grade`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(validatedPayload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to grade assignment');
        }

        // Remove from submitted and refresh graded
        setSubmitted((prev) => prev.filter((a) => a.id !== studentAssignmentId));
        await fetchGradedAssignmentsAdmin();
        return true;
      } catch (err) {
        const msg = getZodErrorMessage(err) || 'Failed to grade assignment';
        setError(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchGradedAssignmentsAdmin]
  );

  const updateGrade = useCallback(
    async (studentAssignmentId, score, feedback = '') => {
      setLoading(true);
      setError(null);
      try {
        // Validate payload against schema before API call
        const validatedPayload = assignmentGradeSchema.parse({ score, feedback });

        const response = await fetch(
          `${API_BASE}/assignments/${studentAssignmentId}/update-grade`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(validatedPayload),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update grade');
        }

        // Refresh graded assignments
        await fetchGradedAssignmentsAdmin();
        return true;
      } catch (err) {
        const msg = getZodErrorMessage(err) || 'Failed to update grade';
        setError(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchGradedAssignmentsAdmin]
  );

  // ADMIN ASSIGNMENT MANAGEMENT
  const fetchAllAssignments = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/assignments/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllAssignments(data.assignments || []);
    } catch (err) {
      handleError(err);
      setAllAssignments([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const createAssignment = useCallback(
    async (title, description, dueDate, courseType) => {
      setLoading(true);
      setError(null);
      try {
        // Validate payload against schema before API call
        const validatedPayload = assignmentCreateSchema.parse({
          title,
          description,
          dueDate,
          courseType,
        });

        const response = await fetch(`${API_BASE}/assignments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...validatedPayload,
            courseId: getCourseId(validatedPayload.courseType),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create assignment');
        }

        // Refresh all assignments
        await fetchAllAssignments();
        return true;
      } catch (err) {
        const msg = getZodErrorMessage(err) || 'Failed to create assignment';
        setError(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAllAssignments]
  );

  const updateAssignment = useCallback(
    async (assignmentId, title, description, dueDate, courseType) => {
      setLoading(true);
      setError(null);
      try {
        // Validate payload against schema before API call
        const validatedPayload = assignmentUpdateSchema.parse({
          title,
          description,
          dueDate,
          courseType,
        });

        const response = await fetch(`${API_BASE}/assignments/${assignmentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...validatedPayload,
            courseId: getCourseId(validatedPayload.courseType),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update assignment');
        }

        // Refresh all assignments
        await fetchAllAssignments();
        return true;
      } catch (err) {
        const msg = getZodErrorMessage(err) || 'Failed to update assignment';
        setError(msg);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token, fetchAllAssignments]
  );

  const deleteAssignment = useCallback(
    async (assignmentId) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/assignments/${assignmentId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to delete assignment');
        }

        // Remove from local state
        setAllAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
        return true;
      } catch (err) {
        handleError(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    // Data
    pending,
    submitted,
    graded,
    allAssignments,
    assignments,
    loading,
    error,
    // Student methods
    fetchPendingAssignments,
    fetchSubmittedAssignments,
    fetchGradedAssignments,
    fetchAssignments,
    submitAssignment,
    // Admin methods
    fetchSubmittedAssignmentsAdmin,
    fetchGradedAssignmentsAdmin,
    gradeAssignment,
    updateGrade,
    // Admin assignment management
    fetchAllAssignments,
    // Note: `fetchAssignments` above is the public student-facing fetch.
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
};