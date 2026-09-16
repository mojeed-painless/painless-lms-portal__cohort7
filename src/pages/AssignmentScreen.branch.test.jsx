import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import AssignmentScreen from './AssignmentScreen.jsx';

import * as AuthContext from '../context/AuthContext';
import * as AssignHook from '../hooks/useAssignments';

describe('AssignmentScreen branch coverage cases', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders error state when hook reports an error and not loading', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', token: 't' } });

    vi.spyOn(AssignHook, 'useAssignments').mockReturnValue({
      pending: [],
      submitted: [],
      graded: [],
      allAssignments: [],
      loading: false,
      error: 'Network failure',
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

    render(<AssignmentScreen />);

    expect(screen.getByText(/Error: Network failure/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retry/i })).toBeInTheDocument();
  });

  it('computes average score correctly when graded scores are strings with %', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student', token: 't' } });

    vi.spyOn(AssignHook, 'useAssignments').mockReturnValue({
      pending: [],
      submitted: [],
      graded: [{ id: 'a1', score: '85%' }, { id: 'a2', score: '95%' }],
      allAssignments: [],
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

    render(<AssignmentScreen />);

    // average of 85 and 95 is 90
    expect(screen.getAllByText(/Average Score:/)[0]).toBeInTheDocument();
    // multiple score spans may exist; ensure at least one matches 90%
    expect(screen.getAllByText('90%').length).toBeGreaterThanOrEqual(1);
  });
});
