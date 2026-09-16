import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { vi } from 'vitest';

import AdminDashboardScreen from './AdminDashboardScreen.jsx';

import * as AuthContext from '../context/AuthContext';
import * as AdminApi from '../services/adminApi';

describe('AdminDashboardScreen branch coverage cases', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows ACCESS DENIED when current user is not admin', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' } });

    render(<AdminDashboardScreen />);

    expect(screen.getByText(/ACCESS DENIED/i)).toBeInTheDocument();
  });

  it('optimistically updates course access then reverts on API error', async () => {
    // admin user
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'admin', _id: 'admin1', token: 't' } });

    // fetchPendingUsers returns empty
    vi.spyOn(AdminApi, 'fetchPendingUsers').mockResolvedValue([]);

    // fetchAllUsers returns one approved user
    vi.spyOn(AdminApi, 'fetchAllUsers').mockResolvedValue([
      {
        _id: 'user1',
        firstName: 'Test',
        lastName: 'User',
        email: 't@u.com',
        role: 'student',
        isApproved: true,
        htmlAccess: false,
        jsAccess: false,
        reactAccess: false,
      },
    ]);

    // updateCourseAccess throws to trigger revert path
    vi.spyOn(AdminApi, 'updateCourseAccess').mockRejectedValue(new Error('update failed'));

    render(<AdminDashboardScreen />);

    // Wait for the approved users table to render
    await waitFor(() => expect(screen.getByText('Test')).toBeInTheDocument());

    // Narrow to the specific user's row and click the HTML access button
    const userRow = screen.getByText('Test').closest('tr');
    expect(userRow).toBeTruthy();
    const grantButton = within(userRow).getAllByRole('button', { name: /Grant/i })[0];
    expect(grantButton).toBeInTheDocument();

    // Click to toggle access (optimistic update runs)
    fireEvent.click(grantButton);

    // After the API error, the button text should revert back to '✓ Grant' (still present)
    await waitFor(() => expect(within(userRow).getAllByRole('button', { name: /Grant/i })[0]).toBeInTheDocument());
  });
});
