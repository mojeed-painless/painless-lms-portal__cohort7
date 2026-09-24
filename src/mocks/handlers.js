import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Assignments List
  http.get('*/api/assignments', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'React Fundamentals Quiz',
        status: 'pending',
        dueDate: '2026-10-01',
      },
      {
        id: '2',
        title: 'CSS Grid & Flexbox Assignment',
        status: 'submitted',
        dueDate: '2026-09-15',
      },
    ]);
  }),

  // Dashboard summary used by services tests and screens
  http.get('*/api/dashboard/summary', () => {
    return HttpResponse.json({ activeCourses: 4, completedQuizzes: 12 });
  }),

  // General leaderboard for hook and screen tests
  http.get('*/api/users/grades', () => {
    return HttpResponse.json([
      { id: '1', studentId: '1', name: 'Alice', score: 95, grade: 'A' },
      { id: '2', studentId: '2', name: 'Bob', score: 88, grade: 'B' },
    ]);
  }),

  // Admin user list endpoints used by the admin dashboard
  http.get('*/api/users/admin/pending', () => {
    return HttpResponse.json({ users: [] });
  }),

  http.get('*/api/users/admin/all', () => {
    return HttpResponse.json({ users: [] });
  }),

  http.put('*/api/users/admin/:userId', async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({ id: params.userId, ...body, updated: true });
  }),

  http.delete('*/api/users/admin/:userId', () => {
    return HttpResponse.json({ message: 'User deleted', deleted: true });
  }),

  // Mock Submit Assignment
  http.post('*/api/assignments/:id/submit', async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        message: 'Assignment submitted successfully',
        submissionId: 'sub_123',
        assignmentId: params.id,
        ...body,
      },
      { status: 201 }
    );
  }),

  // Backwards-compatible Quiz Attempt submission (generic)
  http.post('*/api/quiz-attempts', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(
      {
        status: 'success',
        score: 85,
        passed: true,
        attemptDetails: body,
      },
      { status: 200 }
    );
  }),

  // New: explicit /submit endpoint used by QuizScreen
  http.post('*/api/quiz-attempts/submit', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      submissionId: 'sub_quiz_101',
      score: body.score || 100,
      attempt: {
        id: 'attempt_101',
        score: body.score || 100,
        total: 100,
      },
    });
  }),

  // Topic-specific quiz attempt history and timer endpoints
  http.get('*/api/topics/:topicId/attempts', ({ params }) => {
    return HttpResponse.json({
      attempts: [
        { id: `${params.topicId}-a1`, score: 80, completedAt: '2024-01-01T12:00:00Z' },
        { id: `${params.topicId}-a2`, score: 90, completedAt: '2024-01-02T12:00:00Z' },
      ],
    });
  }),

  http.get('*/api/topics/:topicId/timer', () => {
    return HttpResponse.json({ timeRemaining: 300 });
  }),

  // Mock Quiz Leaderboard
  http.get('*/api/quiz/leaderboard', () => {
    return HttpResponse.json([
      { id: '1', studentName: 'Hanna', score: 98 },
      { id: '2', studentName: 'Raheem', score: 92 },
    ]);
  }),

  // Daily leaderboard queries (may include query string)
  http.get('*/api/quiz-attempts/leaderboard/daily*', () => {
    return HttpResponse.json({ top: [] });
  }),

  // My daily attempt (404 when none)
  http.get('*/api/quiz-attempts/daily*', () => {
    return new HttpResponse(null, { status: 404 });
  }),

  // Session info used by useQuizSession - return a currently-live session
  http.get('*/api/quiz-attempts/session*', () => {
    const now = new Date();
    const start = new Date(now.getTime() - 60 * 1000).toISOString();
    const end = new Date(now.getTime() + 2 * 60 * 1000).toISOString();
    return HttpResponse.json({ session: { startAt: start, endAt: end } });
  }),

  // Daily quiz data lookup used by the refactored hook
  http.get('*/api/quizzes/:quizId', ({ params }) => {
    return HttpResponse.json({ id: params.quizId, title: 'Daily React Quiz' });
  }),

  // Backwards-compatible quiz submission endpoint used by hook tests and legacy screen code
  http.post('*/api/quizzes/submit', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({
      success: true,
      score: body?.answers ? 100 : 0,
      submissionId: 'sub_quiz_101',
    });
  }),

  // Daily leaderboard aggregate used by the hook and analytics screens
  http.get('*/api/quiz-attempts/leaderboard/daily/aggregate', () => {
    return HttpResponse.json([{ name: 'Alice', score: 10 }]);
  }),
];
