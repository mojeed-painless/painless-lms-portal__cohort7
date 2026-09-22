import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchDashboardMetrics, fetchAssignments } from './assignmentApi';

const server = setupServer(
  http.get('*/api/dashboard/summary', () =>
    HttpResponse.json({ activeCourses: 4, completedQuizzes: 12 })
  ),
  http.get('*/api/assignments', () =>
    HttpResponse.json([{ id: 'asgn-1', title: 'CSS Grid Lab' }])
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('assignmentApi Service', () => {
  it('fetches dashboard summary metrics', async () => {
    const metrics = await fetchDashboardMetrics();
    expect(metrics.activeCourses).toBe(4);
  });

  it('fetches assignments list', async () => {
    const assignments = await fetchAssignments();
    expect(assignments).toHaveLength(1);
  });
});
