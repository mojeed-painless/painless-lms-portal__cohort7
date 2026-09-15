import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import QuizScreen from './QuizScreen';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('QuizScreen Leaderboard & Session', () => {
  it('fetches and renders leaderboard scores using apiClient', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: null })),
      http.get('*/api/quiz-attempts/leaderboard/daily*', () => HttpResponse.json({ top: [] })),
      http.get('*/api/quiz-attempts/daily*', () => new HttpResponse(null, { status: 404 })),
      http.get('*/api/quiz/leaderboard', () =>
        HttpResponse.json([
          { id: '1', studentName: 'Hanna', score: 98 },
          { id: '2', studentName: 'Raheem', score: 92 },
        ])
      )
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Hanna')).toBeInTheDocument();
      expect(screen.getByText('98')).toBeInTheDocument();
    });
  });
});