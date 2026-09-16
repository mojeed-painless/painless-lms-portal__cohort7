import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import * as AuthContext from '../../context/AuthContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
  it('calls logout and navigates to /login', () => {
    const mockLogout = vi.fn();

    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ logout: mockLogout });
    render(<LogoutButton />);

    const btn = screen.getByRole('button');
    fireEvent.click(btn);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('hides text when collapsed', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ logout: vi.fn() });
    render(<LogoutButton isCollapsed={true} />);

    expect(screen.queryByText(/Logout/i)).toBeNull();
  });
});
