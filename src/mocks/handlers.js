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

  // Mock Quiz Attempt Submission
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
];