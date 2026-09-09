import { useState } from 'react';

/**
 * Encapsulates the admin-side create/edit/delete assignment workflow that
 * previously lived inline in AssignmentScreen.jsx: which assignment (if any)
 * is being edited, the create/edit form's open/closed state, and the submit
 * and delete handlers that call into useAssignments and surface a toast.
 *
 * @param {object} deps
 * @param {(title: string, description: string, dueDate: string, courseType: string) => Promise<boolean>} deps.createAssignment
 * @param {(id: string, title: string, description: string, dueDate: string, courseType: string) => Promise<boolean>} deps.updateAssignment
 * @param {(id: string) => Promise<boolean>} deps.deleteAssignment
 * @param {(courseId: string) => string} deps.getCourseTypeFromId
 * @param {(message: string, type?: 'success' | 'error' | 'info') => void} deps.showToast
 * @param {string | null} deps.error - latest error from useAssignments, used as a fallback toast message
 */
export function useAdminAssignments({
  createAssignment,
  updateAssignment,
  deleteAssignment,
  getCourseTypeFromId,
  showToast,
  error,
}) {
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
      ? await updateAssignment(
          editingAssignmentId,
          payload.title,
          payload.description,
          payload.dueDate,
          payload.courseType
        )
      : await createAssignment(
          payload.title,
          payload.description,
          payload.dueDate,
          payload.courseType
        );

    if (success) {
      setShowAssignmentForm(false);
      setEditingAssignmentId(null);
      setEditingAssignment({ title: '', courseType: 'html', dueDate: '' });
      showToast(isEditing ? 'Assignment updated successfully!' : 'Assignment created successfully!', 'success');
    } else {
      showToast(error || (isEditing ? 'Failed to update assignment' : 'Failed to create assignment'), 'error');
    }

    return success;
  };

  const handleDeleteAssignment = async (assignmentId) => {
    const success = await deleteAssignment(assignmentId);
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
