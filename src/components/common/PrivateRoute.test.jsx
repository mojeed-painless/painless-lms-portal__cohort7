import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, it, expect } from 'vitest';

import * as AuthContext from '../../context/AuthContext';
import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  it('shows loading when auth is loading', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ isLoading: true, isAuthenticated: false });

    render(
      <MemoryRouter>
        <PrivateRoute />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders child when authenticated', async () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ isLoading: false, isAuthenticated: true });

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/private" element={<PrivateRoute />}>
            <Route index element={<div>SECRET</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/SECRET/i)).toBeInTheDocument();
  });

  it('redirects to home when not authenticated', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ isLoading: false, isAuthenticated: false });

    render(
      <MemoryRouter initialEntries={["/private"]}>
        <Routes>
          <Route path="/private" element={<PrivateRoute />}>
            <Route index element={<div>SECRET</div>} />
          </Route>
          <Route path="/home" element={<div>HOME PAGE</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/SECRET/i)).toBeNull();
    expect(screen.getByText('HOME PAGE')).toBeInTheDocument();
  });

  it('has proper aria attributes on loading state', () => {
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({ isLoading: true, isAuthenticated: false });

    const { container } = render(
      <MemoryRouter>
        <PrivateRoute />
      </MemoryRouter>
    );

    const loadingOverlay = container.querySelector('.loading-overlay');
    expect(loadingOverlay).toHaveAttribute('aria-live', 'polite');
    expect(loadingOverlay).toHaveAttribute('aria-busy', 'true');
  });
});
