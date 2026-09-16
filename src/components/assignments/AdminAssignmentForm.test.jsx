import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import AdminAssignmentForm from './AdminAssignmentForm';

describe('AdminAssignmentForm', () => {
  afterEach(() => vi.restoreAllMocks());

  it('calls onCancel when Cancel button clicked', () => {
    const onCancel = vi.fn();
    render(<AdminAssignmentForm onSubmit={vi.fn()} onCancel={onCancel} />);

    const cancel = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancel);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not call onSubmit when title is empty', () => {
    const onSubmit = vi.fn();
    render(<AdminAssignmentForm onSubmit={onSubmit} onCancel={vi.fn()} />);

    const submit = screen.getByRole('button', { name: /Save Assignment|Create Assignment|Save Changes|Add/i });
    // Submit should be present; attempt to submit with empty title
    fireEvent.click(submit);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed payload when form filled', () => {
    const onSubmit = vi.fn();
    const onCancel = vi.fn();
    render(<AdminAssignmentForm onSubmit={onSubmit} onCancel={onCancel} />);

    const titleInput = screen.getByLabelText(/Assignment Title/i);
    const descInput = screen.getByLabelText(/Description/i);
    const dateInput = screen.getByLabelText(/Due Date/i);
    const courseSelect = screen.getByLabelText(/Course Type/i);

    fireEvent.change(titleInput, { target: { value: '  New Assignment  ' } });
    fireEvent.change(descInput, { target: { value: 'Some instructions' } });
    fireEvent.change(dateInput, { target: { value: '2026-12-31' } });
    fireEvent.change(courseSelect, { target: { value: 'react' } });

    const form = screen.queryByRole('form') || screen.getByRole('button', { name: /Save Assignment|Create Assignment|Save Changes|Add/i }).closest('form');
    expect(form).toBeTruthy();
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Assignment',
      description: 'Some instructions',
      dueDate: '2026-12-31',
      courseType: 'react',
    }));
  });
});
