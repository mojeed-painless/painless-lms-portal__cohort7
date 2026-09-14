import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminGradingPanel from './AdminGradingPanel';

describe('AdminGradingPanel Component', () => {
  let mockHandlers;

  beforeEach(() => {
    mockHandlers = {
      onScoreChange: vi.fn(),
      onSaveScore: vi.fn(),
      onEditScore: vi.fn(),
      onSaveEditedScore: vi.fn(),
    };
  });

  it('renders submitted assignments table', () => {
    const submitted = [
      {
        id: 'sub_1',
        title: 'React Project',
        studentName: 'John Doe',
        dueDate: '2024-01-15',
        submittedDate: '2024-01-14',
        submissionLink: 'https://github.com/user/project',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={submitted}
        graded={[]}
        scores={{}}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    expect(screen.getByText('React Project')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Submitted Assignments/)).toBeInTheDocument();
  });

  it('renders score input and calls onSaveScore when save button clicked', () => {
    const submitted = [
      {
        id: 'sub_1',
        title: 'React Project',
        studentName: 'Jane Smith',
        dueDate: '2024-01-15',
        submittedDate: '2024-01-14',
        submissionLink: 'https://github.com/user/project',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={submitted}
        graded={[]}
        scores={{ sub_1: '95' }}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockHandlers.onSaveScore).toHaveBeenCalledWith('sub_1');
  });

  it('calls onScoreChange when score input changes', () => {
    const submitted = [
      {
        id: 'sub_1',
        title: 'JavaScript Project',
        studentName: 'Bob',
        dueDate: '2024-01-15',
        submittedDate: '2024-01-14',
        submissionLink: 'https://github.com/user/js-project',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={submitted}
        graded={[]}
        scores={{}}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    const input = screen.getByPlaceholderText('Enter score...');
    fireEvent.change(input, { target: { value: '88' } });

    expect(mockHandlers.onScoreChange).toHaveBeenCalledWith('sub_1', '88');
  });

  it('renders graded assignments with edit button', () => {
    const graded = [
      {
        id: 'grad_1',
        title: 'CSS Assignment',
        studentName: 'Alice',
        dueDate: '2024-01-10',
        submittedDate: '2024-01-09',
        submissionLink: 'https://github.com/user/css',
        score: '92%',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={[]}
        graded={graded}
        scores={{}}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    expect(screen.getByText('CSS Assignment')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
    const editButton = screen.getByRole('button', { name: /Edit/i });
    expect(editButton).toBeInTheDocument();
  });

  it('switches to edit mode and calls onEditScore', () => {
    const graded = [
      {
        id: 'grad_1',
        title: 'HTML Project',
        studentName: 'Charlie',
        dueDate: '2024-01-10',
        submittedDate: '2024-01-09',
        submissionLink: 'https://github.com/user/html',
        score: '85%',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={[]}
        graded={graded}
        scores={{}}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    const editButton = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    expect(mockHandlers.onEditScore).toHaveBeenCalledWith('grad_1', '85%');
  });

  it('saves edited score when in edit mode', () => {
    const graded = [
      {
        id: 'grad_1',
        title: 'Final Project',
        studentName: 'Diana',
        dueDate: '2024-01-10',
        submittedDate: '2024-01-09',
        submissionLink: 'https://github.com/user/final',
        score: '90%',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={[]}
        graded={graded}
        scores={{ grad_1: '95' }}
        editingGradedId="grad_1"
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    const saveButton = screen.getByRole('button', { name: /Save/i });
    fireEvent.click(saveButton);

    expect(mockHandlers.onSaveEditedScore).toHaveBeenCalledWith('grad_1');
  });

  it('displays loading state on save button', () => {
    const submitted = [
      {
        id: 'sub_1',
        title: 'Loading Test',
        studentName: 'Eve',
        dueDate: '2024-01-15',
        submittedDate: '2024-01-14',
        submissionLink: 'https://github.com/user/loading',
      },
    ];

    render(
      <AdminGradingPanel
        submitted={submitted}
        graded={[]}
        scores={{ sub_1: '75' }}
        editingGradedId={null}
        loading={true}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    const saveButton = screen.getByRole('button', { name: /Saving/i });
    expect(saveButton).toBeDisabled();
  });

  it('displays empty state for submitted when no assignments', () => {
    render(
      <AdminGradingPanel
        submitted={[]}
        graded={[]}
        scores={{}}
        editingGradedId={null}
        loading={false}
        onScoreChange={mockHandlers.onScoreChange}
        onSaveScore={mockHandlers.onSaveScore}
        onEditScore={mockHandlers.onEditScore}
        onSaveEditedScore={mockHandlers.onSaveEditedScore}
      />
    );

    expect(screen.getByText('No Assignment Submitted')).toBeInTheDocument();
    expect(screen.getByText('No Assignment Graded')).toBeInTheDocument();
  });
});
