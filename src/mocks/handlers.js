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

  // (Admin handlers intentionally omitted here so tests can register specific
  // responses via `server.use(...)`. This prevents global admin handlers from
  // conflicting with test-scoped handlers.)
];
