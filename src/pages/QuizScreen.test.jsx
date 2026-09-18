import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import QuizScreen from './QuizScreen';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('QuizScreen Offline Execution via MSW', () => {
  it('renders leaderboard and completes quiz attempt without live network calls', async () => {
    server.use(
      // Return an active session so the quiz UI becomes interactive
      http.get('*/api/quiz-attempts/session*', () => {
        const now = new Date();
        const start = new Date(now.getTime() - 60 * 1000).toISOString();
        const end = new Date(now.getTime() + 2 * 60 * 1000).toISOString();
        return HttpResponse.json({ session: { startAt: start, endAt: end } });
      }),

      // Leaderboard used by QuizScreen
      http.get('*/api/quiz/leaderboard', () =>
        HttpResponse.json([
          { id: '1', studentName: 'Hanna', score: 98 },
          { id: '2', studentName: 'Raheem', score: 92 },
        ])
      ),

      // Ensure submit endpoint is intercepted
      http.post('*/api/quiz-attempts/submit', async ({ request }) => {
        const body = await request.json();
        return HttpResponse.json({ success: true, submissionId: 'sub_quiz_101', score: body.answers ? 100 : 0 });
      }),

      // Daily-specific endpoints
      http.get('*/api/quiz-attempts/leaderboard/daily*', () => HttpResponse.json({ top: [] })),
      http.get('*/api/quiz-attempts/daily*', () => new HttpResponse(null, { status: 404 }))
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    // Verify offline leaderboard interception
    await waitFor(() => {
      expect(screen.getByText('Hanna')).toBeInTheDocument();
      expect(screen.getByText('98')).toBeInTheDocument();
    });

    // Start the quiz (session is live per handler)
    const startBtn = await screen.findByRole('button', { name: /start quiz/i });
    fireEvent.click(startBtn);

    // Wait for an actionable finish/submit button and submit
    const submitBtn = await screen.findByRole('button', { name: /finish|submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/submitted successfully|score/i)).toBeInTheDocument();
    });
  });
});