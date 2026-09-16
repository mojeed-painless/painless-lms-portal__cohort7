import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ApprovedUserListItem from './ApprovedUserListItem';

describe('ApprovedUserListItem', () => {
  const mockUpdate = vi.fn();
  const mockDelete = vi.fn();
  const user = {
    _id: 'user123',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'student',
  };

  it('renders user info and role', () => {
    const { container } = render(
      <ApprovedUserListItem
        userItem={user}
        handleUpdateUser={mockUpdate}
        handleDeleteUser={mockDelete}
      />
    );

    expect(screen.getByText(/johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    const roleSpan = container.querySelector('.list-role');
    expect(roleSpan).toHaveTextContent('student');
  });

  it('calls handleUpdateUser when role select changes', () => {
    render(
      <ApprovedUserListItem
        userItem={user}
        handleUpdateUser={mockUpdate}
        handleDeleteUser={mockDelete}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'instructor' } });

    expect(mockUpdate).toHaveBeenCalledWith('user123', true, 'instructor');
  });

  it('calls handleDeleteUser when delete button clicked', () => {
    render(
      <ApprovedUserListItem
        userItem={user}
        handleUpdateUser={mockUpdate}
        handleDeleteUser={mockDelete}
      />
    );

    const deleteBtn = screen.getByText(/Delete/i);
    fireEvent.click(deleteBtn);

    expect(mockDelete).toHaveBeenCalledWith('user123');
  });
});
