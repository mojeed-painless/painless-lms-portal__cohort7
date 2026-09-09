import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import QuizScreen from './QuizScreen';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

function isoWithOffset(msOffset = 0) {
  const now = new Date(Date.now() + msOffset);
  return now.toISOString();
}

describe('QuizScreen Page', () => {
  it('renders QuizScreen header and key sections', async () => {
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: null })),
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

    // Page header and instructions render
    await waitFor(() => expect(screen.getByText(/Daily Quiz Center/i)).toBeInTheDocument());
    expect(screen.getByText(/How it works/i)).toBeInTheDocument();
    expect(screen.getByText(/Today's Top 3/i)).toBeInTheDocument();
  });

  it("falls back to yesterday's leaderboard when today has no attempts", async () => {
    let call = 0;
    server.use(
      http.get('*/api/quiz-attempts/session*', () => HttpResponse.json({ session: null })),
      http.get('*/api/quiz-attempts/daily*', () => new HttpResponse(null, { status: 404 })),
      http.get('*/api/quiz-attempts/leaderboard/daily*', () => {
        call += 1;
        // First call = today (empty), second call = yesterday (has data)
        if (call === 1) {
          return HttpResponse.json({ top: [] });
        }
        return HttpResponse.json({
          top: [
            { rank: 1, studentId: 's1', name: 'Ada Lovelace', score: 9, total: 10, timeTaken: 95 },
          ],
        });
      })
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    });
    expect(screen.getByText(/Score: 9\/10/i)).toBeInTheDocument();
    expect(screen.queryByText(/No attempts yet for today/i)).not.toBeInTheDocument();
  });

  it('shows "already attempted" banner instead of Start Quiz during a live session', async () => {
    server.use(
      // Session window: started 10s ago, ends in 60s -> quizIsLive = true
      http.get('*/api/quiz-attempts/session*', () =>
        HttpResponse.json({
          session: {
            date: new Date().toISOString().slice(0, 10),
            startAt: isoWithOffset(-10_000),
            endAt: isoWithOffset(60_000),
          },
        })
      ),
      http.get('*/api/quiz-attempts/leaderboard/daily*', () => HttpResponse.json({ top: [] })),
      http.get('*/api/quiz-attempts/daily*', () =>
        HttpResponse.json({ score: 8, total: 10 })
      )
    );

    const mockUser = { firstName: 'Ada', lastName: 'Lovelace', role: 'student', token: 'test-token' };
    localStorage.setItem('userInfo', JSON.stringify(mockUser));

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/You already attempted today's quiz/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Score: 8\/10/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start quiz/i })).not.toBeInTheDocument();
  });
});