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
});
