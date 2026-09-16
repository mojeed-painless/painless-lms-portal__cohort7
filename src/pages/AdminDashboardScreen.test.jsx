import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import AdminDashboardScreen from './AdminDashboardScreen';

describe('AdminDashboardScreen Operations', () => {
  beforeEach(() => {
    server.resetHandlers();
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: 'admin_1',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        token: 'admin-token',
        email: 'admin@test.com',
      })
    );
    window.confirm = vi.fn(() => true);
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('executes handleUpdateUser when role option is updated', async () => {
    let approvedUsers = [
      {
        id: 'usr_1',
        firstName: 'Hanna',
        lastName: 'Smith',
        email: 'hanna@test.com',
        role: 'student',
        approved: true,
        htmlAccess: true,
        jsAccess: true,
        reactAccess: false,
      },
    ];

    server.use(
      http.get('*/api/users/admin/pending', () => {
        return HttpResponse.json({ users: [] });
      }),
      http.get('*/api/users/admin/all', () => {
        return HttpResponse.json({ users: approvedUsers });
      }),
      http.put('*/api/users/admin/usr_1', async ({ request }) => {
        const body = await request.json();
        approvedUsers = approvedUsers.map((user) =>
          user.id === 'usr_1' ? { ...user, role: body.role } : user
        );
        return HttpResponse.json({ id: 'usr_1', role: body.role });
      })
    );

    render(<AdminDashboardScreen />);

    await waitFor(() => {
      expect(screen.getByText('Hanna')).toBeInTheDocument();
    });

    const roleSelect = screen.getByTestId('user-role-select-usr_1');
    fireEvent.change(roleSelect, { target: { value: 'instructor' } });

    await waitFor(() => {
      expect(screen.getByText(/role updated to instructor/i)).toBeInTheDocument();
    });
  });

  it('executes handleDeleteUser when delete action is confirmed', async () => {
    let approvedUsers = [
      {
        id: 'usr_2',
        firstName: 'Raheem',
        lastName: 'Khan',
        email: 'raheem@test.com',
        role: 'student',
        approved: true,
        htmlAccess: true,
        jsAccess: false,
        reactAccess: true,
      },
    ];

    server.use(
      http.get('*/api/users/admin/pending', () => {
        return HttpResponse.json({ users: [] });
      }),
      http.get('*/api/users/admin/all', () => {
        return HttpResponse.json({ users: approvedUsers });
      }),
      http.delete('*/api/users/admin/usr_2', () => {
        approvedUsers = [];
        return HttpResponse.json({ message: 'User deleted' });
      })
    );

    render(<AdminDashboardScreen />);

    await waitFor(() => {
      expect(screen.getByText('Raheem')).toBeInTheDocument();
    });

    const deleteBtn = screen.getByTestId('delete-user-usr_2');
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText('Raheem')).not.toBeInTheDocument();
    });
  });
});
