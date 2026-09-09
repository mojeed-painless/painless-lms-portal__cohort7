import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAdminAssignments } from './useAdminAssignments';

const getCourseTypeFromId = (courseId) => {
  const map = { html: 'html', css: 'css', javascript: 'js', react: 'react' };
  return map[courseId] || courseId;
};

const setup = (overrides = {}) => {
  const deps = {
    createAssignment: vi.fn().mockResolvedValue(true),
    updateAssignment: vi.fn().mockResolvedValue(true),
    deleteAssignment: vi.fn().mockResolvedValue(true),
    getCourseTypeFromId,
    showToast: vi.fn(),
    error: null,
    ...overrides,
  };
  const { result, rerender } = renderHook((props) => useAdminAssignments(props), {
    initialProps: deps,
  });
  return { result, rerender, deps };
};

describe('useAdminAssignments', () => {
  it('starts with the form closed and no assignment being edited', () => {
    const { result } = setup();
    expect(result.current.showAssignmentForm).toBe(false);
    expect(result.current.editingAssignmentId).toBeNull();
  });

  it('openCreateForm opens the form with no assignment selected', () => {
    const { result } = setup();

    act(() => {
      result.current.openCreateForm();
    });

    expect(result.current.showAssignmentForm).toBe(true);
    expect(result.current.editingAssignmentId).toBeNull();
  });

  it('handleEditAssignment loads the selected assignment into edit state and opens the form', () => {
    const { result } = setup();
    const assignment = { id: 'a1', title: 'Build a form', courseId: 'javascript', dueDate: '2026-12-01' };

    act(() => {
      result.current.handleEditAssignment(assignment);
    });

    expect(result.current.showAssignmentForm).toBe(true);
    expect(result.current.editingAssignmentId).toBe('a1');
    expect(result.current.editingAssignment).toEqual({
      title: 'Build a form',
      courseType: 'js',
      dueDate: '2026-12-01',
    });
  });

  it('closeForm resets both the form visibility and the editing id', () => {
    const { result } = setup();

    act(() => {
      result.current.handleEditAssignment({ id: 'a1', title: 'X', courseId: 'html', dueDate: '2026-01-01' });
    });
    expect(result.current.showAssignmentForm).toBe(true);

    act(() => {
      result.current.closeForm();
    });

    expect(result.current.showAssignmentForm).toBe(false);
    expect(result.current.editingAssignmentId).toBeNull();
  });

  it('handleAdminAssignmentSubmit calls createAssignment when not editing, and closes the form on success', async () => {
    const { result, deps } = setup();
    const payload = { title: 'New one', description: '', dueDate: '2026-12-01', courseType: 'react' };

    let success;
    await act(async () => {
      success = await result.current.handleAdminAssignmentSubmit(payload);
    });

    expect(deps.createAssignment).toHaveBeenCalledWith('New one', '', '2026-12-01', 'react');
    expect(deps.updateAssignment).not.toHaveBeenCalled();
    expect(success).toBe(true);
    expect(result.current.showAssignmentForm).toBe(false);
    expect(deps.showToast).toHaveBeenCalledWith('Assignment created successfully!', 'success');
  });

  it('handleAdminAssignmentSubmit calls updateAssignment when an assignment is being edited', async () => {
    const { result, deps } = setup();

    act(() => {
      result.current.handleEditAssignment({ id: 'a1', title: 'Old title', courseId: 'html', dueDate: '2026-01-01' });
    });

    const payload = { title: 'Updated title', description: 'desc', dueDate: '2026-02-01', courseType: 'html' };
    await act(async () => {
      await result.current.handleAdminAssignmentSubmit(payload);
    });

    expect(deps.updateAssignment).toHaveBeenCalledWith('a1', 'Updated title', 'desc', '2026-02-01', 'html');
    expect(deps.createAssignment).not.toHaveBeenCalled();
    expect(deps.showToast).toHaveBeenCalledWith('Assignment updated successfully!', 'success');
  });

  it('handleAdminAssignmentSubmit surfaces the hook error and keeps the form open on failure', async () => {
    const { result, deps } = setup({
      createAssignment: vi.fn().mockResolvedValue(false),
      error: 'Course is archived',
    });

    let success;
    await act(async () => {
      success = await result.current.handleAdminAssignmentSubmit({
        title: 'X', description: '', dueDate: '2026-01-01', courseType: 'html',
      });
    });

    expect(success).toBe(false);
    expect(result.current.showAssignmentForm).toBe(false); // never opened in this test
    expect(deps.showToast).toHaveBeenCalledWith('Course is archived', 'error');
  });

  it('handleDeleteAssignment calls deleteAssignment and toasts on success', async () => {
    const { result, deps } = setup();

    let success;
    await act(async () => {
      success = await result.current.handleDeleteAssignment('a1');
    });

    expect(deps.deleteAssignment).toHaveBeenCalledWith('a1');
    expect(success).toBe(true);
    expect(deps.showToast).toHaveBeenCalledWith('Assignment deleted successfully!', 'success');
  });

  it('handleDeleteAssignment surfaces the hook error on failure', async () => {
    const { result, deps } = setup({
      deleteAssignment: vi.fn().mockResolvedValue(false),
      error: 'Cannot delete a graded assignment',
    });

    let success;
    await act(async () => {
      success = await result.current.handleDeleteAssignment('a1');
    });

    expect(success).toBe(false);
    expect(deps.showToast).toHaveBeenCalledWith('Cannot delete a graded assignment', 'error');
  });
});
