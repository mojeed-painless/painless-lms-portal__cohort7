import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import * as logger from '../utils/logger';
import LeaderboardScreen from './LeaderboardScreen';

const mockLeaderboardData = [
  { id: '1', name: 'Alice', points: 95, rank: 1 },
  { id: '2', name: 'Bob', points: 88, rank: 2 },
];

const mockGradesData = [{ courseId: 'react-101', grade: 'A' }];

beforeEach(() => {
  server.resetHandlers();
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

describe('LeaderboardScreen Integration', () => {
  it('renders leaderboard data correctly upon successful API fetch', async () => {
    server.use(
      http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () => {
        return HttpResponse.json(mockLeaderboardData);
      }),
      http.get('*/api/users/grades', () => {
        return HttpResponse.json(mockGradesData);
      })
    );

    render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(screen.getByText(/Alice/i)).toBeInTheDocument();
      expect(screen.getByText(/Bob/i)).toBeInTheDocument();
    });
  });

  it('renders fallback or error state gracefully when API fails', async () => {
    server.use(
      http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('daily quiz leaderboard'));
    });
  });

  it('handles malformed API responses gracefully and logs validation errors', async () => {
    const malformedData = [
      {
        rank: 'invalid-rank-type',
        studentId: 12345,
        name: 'John Doe',
      },
    ];

    server.use(
      http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () => {
        return HttpResponse.json(malformedData);
      })
    );

    const logErrorSpy = vi.spyOn(logger, 'logError').mockImplementation(() => {});
    render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(logErrorSpy).toHaveBeenCalledWith(
        'Leaderboard schema validation failed',
        expect.objectContaining({ errors: expect.any(Object) })
      );
      expect(screen.getByText(/Invalid data structure received from server/i)).toBeInTheDocument();
    });
  });
});
