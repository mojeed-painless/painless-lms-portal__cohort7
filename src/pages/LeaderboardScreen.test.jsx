import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import LeaderboardScreen from './LeaderboardScreen';

const mockLeaderboardData = [
  { id: '1', name: 'Alice', points: 95, rank: 1 },
  { id: '2', name: 'Bob', points: 88, rank: 2 },
];

const mockGradesData = [
  { courseId: 'react-101', grade: 'A' },
];

const server = setupServer(
  http.get('/api/quiz-attempts/leaderboard/daily/aggregate', () => {
    return HttpResponse.json(mockLeaderboardData);
  }),
  http.get('/api/users/grades', () => {
    return HttpResponse.json(mockGradesData);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LeaderboardScreen Integration', () => {
  it('renders leaderboard data correctly upon successful API fetch', async () => {
    render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('renders fallback or error state gracefully when API fails', async () => {
    server.use(
      http.get('/api/quiz-attempts/leaderboard/daily/aggregate', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<LeaderboardScreen />);

    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });
});
