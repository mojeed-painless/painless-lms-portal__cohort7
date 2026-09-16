import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import AssignmentScreen from './AssignmentScreen.jsx';
import * as AssignHook from '../hooks/useAssignments';
import * as AdminHook from '../hooks/useAdminAssignments';

describe('AssignmentScreen admin view branches', () => {
  afterEach(() => vi.restoreAllMocks());

  it('renders admin grading panel and uploaded assignments list', () => {
    vi.spyOn(AssignHook, 'useAssignments').mockReturnValue({
      pending: [],
      submitted: [],
      graded: [],
      allAssignments: [{ id: '1', title: 'A1', courseId: 'html', dueDate: new Date().toISOString() }],
      loading: false,
      error: null,
      fetchPendingAssignments: vi.fn(),
      fetchSubmittedAssignments: vi.fn(),
      fetchGradedAssignments: vi.fn(),
      submitAssignment: vi.fn(),
      fetchSubmittedAssignmentsAdmin: vi.fn(),
      fetchGradedAssignmentsAdmin: vi.fn(),
      gradeAssignment: vi.fn(),
      updateGrade: vi.fn(),
      fetchAllAssignments: vi.fn(),
      createAssignment: vi.fn(),
      updateAssignment: vi.fn(),
      deleteAssignment: vi.fn(),
    });

    vi.spyOn(AdminHook, 'useAdminAssignments').mockReturnValue({
      editingAssignmentId: null,
      editingAssignment: null,
      showAssignmentForm: false,
      openCreateForm: vi.fn(),
      closeForm: vi.fn(),
      handleEditAssignment: vi.fn(),
      handleAdminAssignmentSubmit: vi.fn(),
      handleDeleteAssignment: vi.fn(),
    });

    render(<AssignmentScreen role="admin" />);

    expect(screen.getByText(/Admin Grading Panel/i)).toBeInTheDocument();
    expect(screen.getByText(/Uploaded Assignments/i)).toBeInTheDocument();
  });
});
