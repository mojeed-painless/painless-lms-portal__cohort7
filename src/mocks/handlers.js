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

  // Admin Dashboard Handlers
  http.get('*/api/users/admin/pending', () => {
    return HttpResponse.json([
      { id: 'usr_pending_1', name: 'Pending User 1', status: 'pending', role: 'student' },
    ]);
  }),

  http.get('*/api/users/admin/all', () => {
    return HttpResponse.json([
      { id: 'usr_1', name: 'Hanna', status: 'active', role: 'student', isApproved: true, htmlAccess: true },
      { id: 'usr_2', name: 'Raheem', status: 'active', role: 'student', isApproved: true, jsAccess: true },
    ]);
  }),

  http.patch('*/api/users/admin/:id/updateCourseAccess', async ({ request, params }) => {
    const { accessList } = await request.json();
    return HttpResponse.json({
      id: params.id,
      accessList,
      message: 'Course access updated successfully',
    });
  }),

  // Update user and delete user endpoints used by AdminDashboardScreen
  http.patch('*/api/users/admin/:id', async ({ request, params }) => {
    const body = await request.json();
    return HttpResponse.json({ id: params.id, ...body });
  }),

  http.delete('*/api/users/admin/:id', async ({ params }) => {
    return HttpResponse.json({ id: params.id, deleted: true });
  }),
];