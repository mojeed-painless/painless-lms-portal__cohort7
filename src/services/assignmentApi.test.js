import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { fetchDashboardMetrics, fetchAssignments } from './assignmentApi';

beforeEach(() => {
  server.use(
    http.get('*/api/dashboard/summary', () =>
      HttpResponse.json({ activeCourses: 4, completedQuizzes: 12 })
    ),
    http.get('*/api/assignments', () =>
      HttpResponse.json([{ id: 'asgn-1', title: 'CSS Grid Lab' }])
    )
  );
});

afterEach(() => server.resetHandlers());

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
