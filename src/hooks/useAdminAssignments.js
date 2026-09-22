import { useState } from 'react';
import { fetchJson } from '../services/apiClient';
import { logError } from '../utils/logger';

export function useAdminAssignments(config) {
  // Backwards-compatible overload: when called with a config object,
  // behave as the form-state hook (used by AssignmentScreen).
  if (config && typeof config === 'object') {
    throw new Error(
      'useAdminAssignments no longer accepts a config object. Please use useAdminAssignmentForm(config) instead.'
    );
  }

  const [gradingLoading, setGradingLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizeError = (err) => {
    if (!err) return null;
    if (typeof err === 'string') return err;
    if (err?.message) return err.message;
    if (Array.isArray(err)) return err[0]?.message || String(err[0]);
    return String(err);
  };

  const createAssignment = async (assignmentData) => {
    try {
      setError(null);
      return await fetchJson('/assignments', {
        method: 'POST',
        body: JSON.stringify(assignmentData),
      });
    } catch (err) {
      setError(normalizeError(err));
      throw err;
    }
  };

  const gradeSubmission = async (submissionId, score) => {
    setGradingLoading(true);
    try {
      setError(null);
      return await fetchJson(`/assignments/${submissionId}/grade`, {
        method: 'PUT',
        body: JSON.stringify({ score }),
      });
    } catch (err) {
      const message = normalizeError(err) || 'Failed to grade assignment submission';
      logError('Failed to grade assignment submission', { error: message });
      setError(message);
      throw err;
    } finally {
      setGradingLoading(false);
    }
  };

  return { createAssignment, gradeSubmission, gradingLoading, error };
}

/**
 * Form-state hook for admin assignment create/edit workflow.
 * Preserved for backward compatibility with AssignmentScreen.jsx
 */
export function useAdminAssignmentForm({
  createAssignment: createFn,
  updateAssignment: updateFn,
  deleteAssignment: deleteFn,
  getCourseTypeFromId,
  showToast,
  error,
} = {}) {
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState({
    title: '',
    courseType: 'html',
    dueDate: '',
  });
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);

  const openCreateForm = () => {
    setEditingAssignmentId(null);
    setShowAssignmentForm(true);
  };

  const closeForm = () => {
    setShowAssignmentForm(false);
    setEditingAssignmentId(null);
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignmentId(assignment.id);
    setEditingAssignment({
      title: assignment.title,
      courseType: getCourseTypeFromId(assignment.courseId),
      dueDate: assignment.dueDate,
    });
    setShowAssignmentForm(true);
  };

  const handleAdminAssignmentSubmit = async (payload) => {
    const isEditing = Boolean(editingAssignmentId);

    const success = isEditing
      ? await updateFn(
          editingAssignmentId,
          payload.title,
          payload.description,
          payload.dueDate,
          payload.courseType
        )
      : await createFn(payload.title, payload.description, payload.dueDate, payload.courseType);

    if (success) {
      setShowAssignmentForm(false);
      setEditingAssignmentId(null);
      setEditingAssignment({ title: '', courseType: 'html', dueDate: '' });
      showToast(
        isEditing ? 'Assignment updated successfully!' : 'Assignment created successfully!',
        'success'
      );
    } else {
      showToast(
        error || (isEditing ? 'Failed to update assignment' : 'Failed to create assignment'),
        'error'
      );
    }

    return success;
  };

  const handleDeleteAssignment = async (assignmentId) => {
    const success = await deleteFn(assignmentId);
    if (success) {
      showToast('Assignment deleted successfully!', 'success');
    } else {
      showToast(error || 'Failed to delete assignment', 'error');
    }
    return success;
  };

  return {
    editingAssignmentId,
    editingAssignment,
    showAssignmentForm,
    openCreateForm,
    closeForm,
    handleEditAssignment,
    handleAdminAssignmentSubmit,

    handleDeleteAssignment,
  };
}
