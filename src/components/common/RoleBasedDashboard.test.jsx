import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as AuthContext from '../../context/AuthContext';
import RoleBasedDashboard from './RoleBasedDashboard';

// Mock the dashboard pages
vi.mock('../../pages/DashboardScreen', () => ({
  __esModule: true,
  default: () => <div>Student Dashboard</div>,
}));

vi.mock('../../pages/AdminDashboardScreen', () => ({
  __esModule: true,
  default: () => <div>Admin Dashboard</div>,
}));

describe('RoleBasedDashboard', () => {
  it('shows redirecting when user is null', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: null });

    render(<RoleBasedDashboard />);

    expect(screen.getByText(/Redirecting/i)).toBeInTheDocument();
  });

  it('renders StudentDashboard for student role', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'student' } });

    render(<RoleBasedDashboard />);

    expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  });

  it('renders AdminDashboard for admin role', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ user: { role: 'admin' } });

    render(<RoleBasedDashboard />);

    expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
  });
});
