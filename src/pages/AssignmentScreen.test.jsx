import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import AssignmentScreen from './AssignmentScreen';

describe('AssignmentScreen Integration', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('handles student assignment submission flow', async () => {
    server.use(
      http.get('*/api/assignments/student/pending', () => {
        return HttpResponse.json({
          assignments: [{ id: 'asg_101', title: 'Final Project', dueDate: '2026-10-01' }],
        });
      }),
      http.get('*/api/assignments/student/submitted', () => {
        return HttpResponse.json({ assignments: [] });
      }),
      http.get('*/api/assignments/student/graded', () => {
        return HttpResponse.json({ assignments: [] });
      }),
      http.post('*/api/assignments/asg_101/submit', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ success: true, message: 'Submitted successfully', ...body });
      })
    );

    render(<AssignmentScreen assignmentId="asg_101" role="student" />);

    await waitFor(() => {
      expect(screen.getByText(/Assignment Details/i)).toBeInTheDocument();
    });

    const urlInput = screen.getByPlaceholderText(/submission url/i);
    fireEvent.change(urlInput, { target: { value: 'https://github.com/mojeed-painless/test-repo' } });

    const submitBtn = screen.getByRole('button', { name: /submit assignment/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/submitted successfully/i)).toBeInTheDocument();
    });
  });

  it('handles admin save score and edit score flows', async () => {
    server.use(
      http.get('*/api/assignments/admin/all', () => {
        return HttpResponse.json({ assignments: [] });
      }),
      http.get('*/api/assignments/admin/submitted', () => {
        return HttpResponse.json({
          assignments: [
            {
              id: 'sub_1',
              title: 'API Integration',
              studentName: 'Jane Doe',
              dueDate: '2026-10-01',
              submittedDate: '2026-09-29',
              submissionLink: 'https://github.com/demo/project',
            },
          ],
        });
      }),
      http.get('*/api/assignments/admin/graded', () => {
        return HttpResponse.json({ assignments: [] });
      }),
      http.put('*/api/assignments/sub_1/grade', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ id: 'sub_1', score: body.score });
      })
    );

    render(<AssignmentScreen assignmentId="asg_101" role="admin" />);

    await waitFor(() => {
      expect(screen.getByText(/Admin Grading Panel/i)).toBeInTheDocument();
    });

    const scoreInput = screen.getByRole('spinbutton');
    fireEvent.change(scoreInput, { target: { value: '92' } });

    const saveBtn = screen.getByRole('button', { name: /save score/i });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText(/score saved/i)).toBeInTheDocument();
    });
  });
});