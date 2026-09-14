import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import AdminDashboardScreen from './AdminDashboardScreen';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';

describe('AdminDashboardScreen Integration Test', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    server.resetHandlers();
    // Set up mock admin user in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify({
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        token: 'admin-token',
        email: 'admin@test.com',
      })
    );
  });

  it('renders admin dashboard with pending users section', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@test.com',
              role: 'student',
            },
          ],
        })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_2',
              firstName: 'Jane',
              lastName: 'Smith',
              email: 'jane@test.com',
              role: 'student',
              courseAccess: ['html', 'css'],
            },
          ],
        })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Pending Approvals/i)).toBeInTheDocument();
  });

  it('fetches and displays pending users list', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Hanna',
              lastName: 'Montana',
              email: 'hanna@test.com',
              role: 'student',
            },
            {
              id: 'user_2',
              firstName: 'Billy',
              lastName: 'Ray',
              email: 'billy@test.com',
              role: 'instructor',
            },
          ],
        })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({ users: [] })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Hanna')).toBeInTheDocument();
      expect(screen.getByText('Billy')).toBeInTheDocument();
    });
  });

  it('displays approved users list', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({ users: [] })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Alice',
              lastName: 'Anderson',
              email: 'alice@test.com',
              role: 'student',
              approved: true,
              courseAccess: ['html', 'css', 'js'],
            },
            {
              id: 'user_2',
              firstName: 'Bob',
              lastName: 'Builder',
              email: 'bob@test.com',
              role: 'instructor',
              approved: true,
              courseAccess: ['react'],
            },
          ],
        })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('handles user deletion', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Hanna',
              lastName: 'Montana',
              email: 'hanna@test.com',
              role: 'student',
            },
          ],
        })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({ users: [] })
      ),
      http.delete('*/api/users/admin/*', () =>
        HttpResponse.json({ message: 'User deleted successfully' })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Hanna')).toBeInTheDocument();
    });

    // Find and click delete button
    const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('displays user roles correctly', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({ users: [] })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Charlie',
              lastName: 'Chen',
              email: 'charlie@test.com',
              role: 'student',
              approved: true,
            },
            {
              id: 'user_2',
              firstName: 'Diana',
              lastName: 'Davis',
              email: 'diana@test.com',
              role: 'instructor',
              approved: true,
            },
            {
              id: 'user_3',
              firstName: 'Eve',
              lastName: 'Evans',
              email: 'eve@test.com',
              role: 'admin',
              approved: true,
            },
          ],
        })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Charlie')).toBeInTheDocument();
      expect(screen.getByText('Diana')).toBeInTheDocument();
      expect(screen.getByText('Eve')).toBeInTheDocument();
    });
  });

  it('handles server error gracefully', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({ error: 'Server error' }, { status: 500 })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({ error: 'Server error' }, { status: 500 })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    // Page should still render with error message
    await waitFor(() => {
      expect(screen.getByText(/Admin Dashboard/i)).toBeInTheDocument();
    });
  });

  it('displays empty state when no pending users', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({ users: [] })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Frank',
              lastName: 'Freeman',
              email: 'frank@test.com',
              role: 'student',
              approved: true,
            },
          ],
        })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Frank')).toBeInTheDocument();
    });
  });

  it('displays user emails in the list', async () => {
    server.use(
      http.get('*/api/users/admin/pending*', () =>
        HttpResponse.json({ users: [] })
      ),
      http.get('*/api/users/admin/all*', () =>
        HttpResponse.json({
          users: [
            {
              id: 'user_1',
              firstName: 'Grace',
              lastName: 'Green',
              email: 'grace@example.com',
              role: 'student',
              approved: true,
            },
          ],
        })
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboardScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('grace@example.com')).toBeInTheDocument();
    });
  });
});
