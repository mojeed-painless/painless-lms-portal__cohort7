import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import QuizScreen from './QuizScreen';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

describe('QuizScreen Offline Execution via MSW', () => {
  it(
    'renders leaderboard and completes quiz attempt without live network calls',
    { timeout: 20000 },
    async () => {
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
          return HttpResponse.json({
            success: true,
            submissionId: 'sub_quiz_101',
            score: body.answers ? 100 : 0,
          });
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

      // Advance through questions until a Finish button appears
      let submitBtn = null;
      for (let i = 0; i < 10; i++) {
        try {
          submitBtn = await screen.findByRole('button', { name: /finish|submit/i, timeout: 200 });
          break;
        } catch (e) {
          const next = screen.queryByRole('button', { name: /next/i });
          if (next) fireEvent.click(next);
          else break;
        }
      }

      if (!submitBtn) {
        // Fallback: try to find any button labelled Submit
        submitBtn = await screen.findByRole('button', { name: /submit/i });
      }
      fireEvent.click(submitBtn);

      await waitFor(() => {
        const matches = screen.getAllByText(/submitted successfully|score/i);
        expect(matches.length).toBeGreaterThan(0);
      });
    }
  );
});

describe('QuizScreen Integration (submit endpoints)', () => {
  it('handles successful quiz submission (200 OK)', { timeout: 20000 }, async () => {
    // ensure submit endpoint returns 200 OK
    server.use(
      http.post('http://localhost:5000/api/quiz-attempts/submit', () => {
        return HttpResponse.json({ success: true, score: 100 }, { status: 200 });
      }),
      http.get('http://localhost:5000/api/quiz-attempts/leaderboard/daily/aggregate', () => {
        return HttpResponse.json([]);
      })
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    const startBtn = await screen.findByRole('button', { name: /start quiz/i });
    fireEvent.click(startBtn);

    let submitBtn = null;
    for (let i = 0; i < 10; i++) {
      try {
        submitBtn = await screen.findByRole('button', { name: /finish|submit/i, timeout: 200 });
        break;
      } catch (e) {
        const next = screen.queryByRole('button', { name: /next/i });
        if (next) fireEvent.click(next);
        else break;
      }
    }

    if (!submitBtn) submitBtn = await screen.findByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const matches = screen.getAllByText(/submitted successfully|score/i);
      expect(matches.length).toBeGreaterThan(0);
    });
  });

  it('handles duplicate quiz submission conflict (409 Conflict)', { timeout: 20000 }, async () => {
    server.use(
      http.post('http://localhost:5000/api/quiz-attempts/submit', () => {
        return HttpResponse.json(
          { message: 'Quiz already attempted today', attempt: { score: 80, total: 100 } },
          { status: 409 }
        );
      })
    );

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    const startBtn = await screen.findByRole('button', { name: /start quiz/i });
    fireEvent.click(startBtn);

    let submitBtn = null;
    for (let i = 0; i < 10; i++) {
      try {
        submitBtn = await screen.findByRole('button', { name: /finish|submit/i, timeout: 200 });
        break;
      } catch (e) {
        const next = screen.queryByRole('button', { name: /next/i });
        if (next) fireEvent.click(next);
        else break;
      }
    }

    if (!submitBtn) submitBtn = await screen.findByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const matches = screen.getAllByText(/already attempted today|you already attempted/i);
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});

describe('QuizScreen edge-case coverage', () => {
  it('falls back to yesterday leaderboard data when today is empty', async () => {
    vi.resetModules();
    vi.stubEnv('MODE', 'development');
    const { default: DevQuizScreen } = await import('./QuizScreen');

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const todayIso = today.toISOString().slice(0, 10);
    const yesterdayIso = yesterday.toISOString().slice(0, 10);

    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((input) => {
      const url = String(input);

      if (url.includes('/api/quiz-attempts/session')) {
        const now = new Date();
        const start = new Date(now.getTime() - 60 * 1000).toISOString();
        const end = new Date(now.getTime() + 2 * 60 * 1000).toISOString();
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ session: { startAt: start, endAt: end } }),
        });
      }

      if (url.includes('/api/quiz/leaderboard')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ top: [] }),
        });
      }

      if (url.includes(`/api/quiz-attempts/leaderboard/daily?date=${todayIso}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ top: [] }),
        });
      }

      if (url.includes(`/api/quiz-attempts/leaderboard/daily?date=${yesterdayIso}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            top: [{ studentId: 'u1', name: 'Alex', score: 95, total: 100, timeTaken: 45 }],
          }),
        });
      }

      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });
    });

    try {
      render(
        <AuthProvider>
          <MemoryRouter>
            <DevQuizScreen />
          </MemoryRouter>
        </AuthProvider>
      );

      await waitFor(() => {
        expect(screen.getByText('Alex')).toBeInTheDocument();
      });

      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining('/api/quiz-attempts/leaderboard/daily?date='),
        expect.objectContaining({ headers: {} })
      );
    } finally {
      vi.unstubAllEnvs();
      vi.restoreAllMocks();
    }
  });

  it('shows the already-attempted message when a duplicate daily submission returns 409', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockImplementation((input) => {
      const url = String(input);

      if (url.includes('/api/quiz-attempts/session')) {
        const now = new Date();
        const start = new Date(now.getTime() - 60 * 1000).toISOString();
        const end = new Date(now.getTime() + 2 * 60 * 1000).toISOString();
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ session: { startAt: start, endAt: end } }),
        });
      }

      if (url.includes('/api/quiz/leaderboard')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ top: [] }),
        });
      }

      if (url.includes('/api/quiz-attempts/leaderboard/daily')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ top: [] }),
        });
      }

      if (url.includes('/api/quiz-attempts/submit')) {
        return Promise.resolve({
          ok: false,
          status: 409,
          json: () => Promise.resolve({ message: 'You have already submitted this quiz.', attempt: { score: 80, total: 100 } }),
        });
      }

      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      });
    });

    render(
      <AuthProvider>
        <MemoryRouter>
          <QuizScreen />
        </MemoryRouter>
      </AuthProvider>
    );

    const startBtn = await screen.findByRole('button', { name: /start quiz/i });
    fireEvent.click(startBtn);

    let submitBtn = null;
    for (let i = 0; i < 10; i++) {
      try {
        submitBtn = await screen.findByRole('button', { name: /finish|submit/i, timeout: 200 });
        break;
      } catch (e) {
        const next = screen.queryByRole('button', { name: /next/i });
        if (next) fireEvent.click(next);
        else break;
      }
    }

    if (!submitBtn) submitBtn = await screen.findByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/you already attempted today's quiz/i)).toBeInTheDocument();
      expect(screen.getByText(/score: 80\/100/i)).toBeInTheDocument();
    });

    fetchSpy.mockRestore();
  });
});
