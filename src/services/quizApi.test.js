import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchQuiz, submitQuizAnswer, fetchLeaderboard, fetchTopicAttempts } from './quizApi';

const server = setupServer(
  http.get('*/api/quizzes/q-100', () => HttpResponse.json({ id: 'q-100', title: 'React State' })),
  http.post('*/api/quizzes/submit', () => HttpResponse.json({ success: true, score: 90 })),
  http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () =>
    HttpResponse.json([{ name: 'Jane', score: 100 }])
  ),
  http.get('*/api/topics/t-1/attempts', () => HttpResponse.json([{ id: 'att-1', score: 80 }]))
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('quizApi Service', () => {
  it('fetches quiz by ID', async () => {
    const data = await fetchQuiz('q-100');
    expect(data.title).toBe('React State');
  });

  it('submits quiz answers', async () => {
    const res = await submitQuizAnswer('q-100', { q1: 'a' });
    expect(res.success).toBe(true);
  });

  it('fetches leaderboard', async () => {
    const leaders = await fetchLeaderboard();
    expect(leaders).toHaveLength(1);
  });

  it('fetches topic attempts', async () => {
    const attempts = await fetchTopicAttempts('t-1');
    expect(attempts).toHaveLength(1);
  });
});
