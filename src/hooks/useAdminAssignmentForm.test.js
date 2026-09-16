import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAdminAssignments } from './useAdminAssignments';

describe('useAdminAssignmentForm (form-state) behavior', () => {
  it('open/close form and create path success', async () => {
    const createFn = vi.fn().mockResolvedValue(true);
    const showToast = vi.fn();

    const { result } = renderHook(() =>
      useAdminAssignments({ createAssignment: createFn, updateAssignment: vi.fn(), deleteAssignment: vi.fn(), getCourseTypeFromId: (id) => id, showToast })
    );

    // Initially hidden
    expect(result.current.showAssignmentForm).toBe(false);

    act(() => result.current.openCreateForm());
    expect(result.current.showAssignmentForm).toBe(true);

    // Submit new assignment
    let res;
    await act(async () => {
      res = await result.current.handleAdminAssignmentSubmit({ title: 'T', description: '', dueDate: '2026-12-31', courseType: 'html' });
    });

    expect(createFn).toHaveBeenCalled();
    expect(res).toBe(true);
    expect(showToast).toHaveBeenCalledWith(expect.stringContaining('created'), 'success');
  });

  it('edit path uses update and shows error toast on failure', async () => {
    const updateFn = vi.fn().mockResolvedValue(false);
    const showToast = vi.fn();

    const { result } = renderHook(() =>
      useAdminAssignments({ createAssignment: vi.fn(), updateAssignment: updateFn, deleteAssignment: vi.fn(), getCourseTypeFromId: (id) => id, showToast, error: 'Some error' })
    );

    // Simulate entering edit mode
    act(() => result.current.handleEditAssignment({ id: '1', title: 'Old', courseId: 'html', dueDate: '2026-01-01' }));
    expect(result.current.showAssignmentForm).toBe(true);

    let res;
    await act(async () => {
      res = await result.current.handleAdminAssignmentSubmit({ title: 'Updated', description: '', dueDate: '2026-12-31', courseType: 'html' });
    });

    expect(updateFn).toHaveBeenCalled();
    expect(res).toBe(false);
    expect(showToast).toHaveBeenCalledWith('Some error' || expect.any(String), 'error');
  });

  it('handleDeleteAssignment shows success and error toasts appropriately', async () => {
    const deleteSuccess = vi.fn().mockResolvedValue(true);
    const deleteFail = vi.fn().mockResolvedValue(false);
    const showToast = vi.fn();

    const { result: r1 } = renderHook(() =>
      useAdminAssignments({ createAssignment: vi.fn(), updateAssignment: vi.fn(), deleteAssignment: deleteSuccess, getCourseTypeFromId: (id) => id, showToast })
    );

    await act(async () => {
      const ok = await r1.current.handleDeleteAssignment('1');
      expect(ok).toBe(true);
    });
    expect(showToast).toHaveBeenCalledWith('Assignment deleted successfully!', 'success');

    const { result: r2 } = renderHook(() =>
      useAdminAssignments({ createAssignment: vi.fn(), updateAssignment: vi.fn(), deleteAssignment: deleteFail, getCourseTypeFromId: (id) => id, showToast })
    );

    await act(async () => {
      const ok = await r2.current.handleDeleteAssignment('2');
      expect(ok).toBe(false);
    });
    expect(showToast).toHaveBeenCalledWith(expect.any(String), 'error');
  });
});
