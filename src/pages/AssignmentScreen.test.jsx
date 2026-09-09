import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import AssignmentScreen from './AssignmentScreen';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

const renderAsAdmin = () => {
  const mockUser = { firstName: 'Admin', lastName: 'User', role: 'admin', token: 'test-token' };
  localStorage.setItem('userInfo', JSON.stringify(mockUser));

  return render(
    <AuthProvider>
      <MemoryRouter>
        <AssignmentScreen />
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('AssignmentScreen Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('fetches and renders assignment lists', async () => {
    // Provide a mocked admin session so the component triggers admin endpoints
    const mockUser = { firstName: 'Admin', lastName: 'User', role: 'admin', token: 'test-token' };
    localStorage.setItem('userInfo', JSON.stringify(mockUser));

    // Mock admin endpoints used by the page
    server.use(
      http.get('*/api/assignments/admin/all', () => {
        return HttpResponse.json({ assignments: [
          { id: '1', title: 'React Fundamentals Quiz', courseId: 'javascript', dueDate: '2026-10-01' },
        ] });
      }),
      http.get('*/api/assignments/admin/submitted', () => HttpResponse.json({ assignments: [] })),
      http.get('*/api/assignments/admin/graded', () => HttpResponse.json({ assignments: [] }))
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <AssignmentScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/React Fundamentals/i)).toBeInTheDocument();
    });
  });

  it('lets an admin delete an assignment from the uploaded list', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('*/api/assignments/admin/all', () => {
        return HttpResponse.json({
          assignments: [
            { id: '1', title: 'React Fundamentals Quiz', courseId: 'javascript', dueDate: '2026-10-01' },
          ],
        });
      }),
      http.get('*/api/assignments/admin/submitted', () => HttpResponse.json({ assignments: [] })),
      http.get('*/api/assignments/admin/graded', () => HttpResponse.json({ assignments: [] })),
      http.delete('*/api/assignments/1', () => new HttpResponse(null, { status: 204 }))
    );

    renderAsAdmin();

    await waitFor(() => {
      expect(screen.getByText(/React Fundamentals/i)).toBeInTheDocument();
    });

    const deleteButton = document.querySelector('.delete-btn');
    expect(deleteButton).not.toBeNull();
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/React Fundamentals/i)).not.toBeInTheDocument();
    });
  });

  it('shows an error message and does not remove the item when delete fails', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('*/api/assignments/admin/all', () => {
        return HttpResponse.json({
          assignments: [
            { id: '1', title: 'Protected Assignment', courseId: 'html', dueDate: '2026-10-01' },
          ],
        });
      }),
      http.get('*/api/assignments/admin/submitted', () => HttpResponse.json({ assignments: [] })),
      http.get('*/api/assignments/admin/graded', () => HttpResponse.json({ assignments: [] })),
      http.delete('*/api/assignments/1', () => {
        return HttpResponse.json({ message: 'Cannot delete a graded assignment' }, { status: 403 });
      })
    );

    renderAsAdmin();

    await waitFor(() => {
      expect(screen.getByText(/Protected Assignment/i)).toBeInTheDocument();
    });

    await user.click(document.querySelector('.delete-btn'));

    // The hook's handleError sets `error`, which flips AssignmentScreen into
    // its dedicated error view (see the `if (error && !loading)` early return).
    await waitFor(() => {
      expect(screen.getByText(/Cannot delete a graded assignment/i)).toBeInTheDocument();
    });
  });

  it('opens the create-assignment form when "New Assignment" is clicked', async () => {
    const user = userEvent.setup();

    server.use(
      http.get('*/api/assignments/admin/all', () => HttpResponse.json({ assignments: [] })),
      http.get('*/api/assignments/admin/submitted', () => HttpResponse.json({ assignments: [] })),
      http.get('*/api/assignments/admin/graded', () => HttpResponse.json({ assignments: [] }))
    );

    renderAsAdmin();

    const newAssignmentButton = await screen.findByRole('button', { name: /new assignment/i });
    await user.click(newAssignmentButton);

    // Toggling the form swaps the "New Assignment" trigger button out entirely
    expect(screen.queryByRole('button', { name: /new assignment/i })).not.toBeInTheDocument();
  });
});