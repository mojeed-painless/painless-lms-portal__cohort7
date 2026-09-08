import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AssignmentScreen from './AssignmentScreen';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

describe('AssignmentScreen Page', () => {
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
});
