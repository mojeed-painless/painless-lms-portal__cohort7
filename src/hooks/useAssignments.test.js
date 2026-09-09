import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import { useAssignments } from './useAssignments';

describe('useAssignments Hook', () => {
  it('fetches assignments successfully on fetchAssignments()', async () => {
    const { result } = renderHook(() => useAssignments());

    expect(result.current.loading).toBe(false);
    expect(result.current.assignments).toEqual([]);

    act(() => {
      result.current.fetchAssignments();
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toHaveLength(2);
    expect(result.current.assignments[0].title).toBe('React Fundamentals Quiz');
    expect(result.current.error).toBeNull();
  });

  it('handles server error when fetching assignments fails', async () => {
    // Override MSW default handler to return 500 error
    server.use(
      http.get('*/api/assignments', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useAssignments());

    act(() => {
      result.current.fetchAssignments();
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.assignments).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch assignments');
  });

  it('submits assignment successfully', async () => {
    const { result } = renderHook(() => useAssignments());
    const payload = { submissionUrl: 'https://example.com/submission' };

    let response;
    await act(async () => {
      response = await result.current.submitAssignment('1', payload);
    });

    expect(response.message).toBe('Assignment submitted successfully');
    expect(response.assignmentId).toBe('1');
    expect(result.current.error).toBeNull();
  });

  // ===== VALIDATION TESTS =====
  describe('Validation - submitAssignment', () => {
    it('rejects submission with missing submissionUrl before API call', async () => {
      const { result } = renderHook(() => useAssignments());
      const invalidPayload = { notes: 'Some notes' };

      await act(async () => {
        try {
          await result.current.submitAssignment('1', invalidPayload);
        } catch (err) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Submission URL is required');
      expect(result.current.loading).toBe(false);
    });

    it('rejects submission with invalid URL before API call', async () => {
      const { result } = renderHook(() => useAssignments());
      const invalidPayload = { submissionUrl: 'not-a-valid-url' };

      await act(async () => {
        try {
          await result.current.submitAssignment('1', invalidPayload);
        } catch (err) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Please provide a valid URL');
      expect(result.current.loading).toBe(false);
    });

    it('rejects submission with notes exceeding 500 characters', async () => {
      const { result } = renderHook(() => useAssignments());
      const longNotes = 'a'.repeat(501);
      const invalidPayload = {
        submissionUrl: 'https://example.com/submission',
        notes: longNotes,
      };

      await act(async () => {
        try {
          await result.current.submitAssignment('1', invalidPayload);
        } catch (err) {
          // Expected to throw
        }
      });

      expect(result.current.error).toBe('Notes cannot exceed 500 characters');
      expect(result.current.loading).toBe(false);
    });

    it('accepts valid submission with URL and notes', async () => {
      const { result } = renderHook(() => useAssignments());
      const validPayload = {
        submissionUrl: 'https://example.com/submission',
        notes: 'Here is my completed assignment',
      };

      let response;
      await act(async () => {
        response = await result.current.submitAssignment('1', validPayload);
      });

      expect(result.current.error).toBeNull();
      expect(response).toBeDefined();
      expect(response.message).toBe('Assignment submitted successfully');
    });
  });

  describe('Validation - gradeAssignment', () => {
    const TOKEN = 'test-token';

    it('rejects grade with non-numeric score before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', 'invalid-score', 'Good work');
      });

      expect(gradeResult).toBe(false);
      expect(result.current.error).toBe('Score must be a valid number');
    });

    it('rejects grade with score below 0 before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', -5, 'Good work');
      });

      expect(gradeResult).toBe(false);
      expect(result.current.error).toBe('Score must be between 0 and 100');
    });

    it('rejects grade with score above 100 before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', 105, 'Perfect work');
      });

      expect(gradeResult).toBe(false);
      expect(result.current.error).toBe('Score must be between 0 and 100');
    });

    it('rejects grade with feedback exceeding 1000 characters', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));
      const longFeedback = 'a'.repeat(1001);

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', 85, longFeedback);
      });

      expect(gradeResult).toBe(false);
      expect(result.current.error).toBe('Feedback cannot exceed 1000 characters');
    });

    it('accepts valid grade with score and feedback', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      server.use(
        http.put('*/api/assignments/1/grade', () => {
          return HttpResponse.json({ success: true });
        }),
        http.get('*/api/assignments/admin/graded', () => {
          return HttpResponse.json({ assignments: [] });
        })
      );

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', 85, 'Excellent work!');
      });

      expect(gradeResult).toBe(true);
      expect(result.current.error).toBeNull();
    });
  });

  describe('Validation - updateGrade', () => {
    const TOKEN = 'test-token';

    it('rejects update with non-numeric score before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const updateResult = await act(async () => {
        return await result.current.updateGrade('1', 'abc', 'Good work');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Score must be a valid number');
    });

    it('rejects update with score out of range before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const updateResult = await act(async () => {
        return await result.current.updateGrade('1', 150, '');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Score must be between 0 and 100');
    });
  });

  describe('Validation - createAssignment', () => {
    const TOKEN = 'test-token';

    it('rejects creation with empty title before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const createResult = await act(async () => {
        return await result.current.createAssignment('', 'Description', '2026-12-31', 'html');
      });

      expect(createResult).toBe(false);
      expect(result.current.error).toBe('Assignment title cannot be empty');
    });

    it('rejects creation with missing dueDate before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const createResult = await act(async () => {
        return await result.current.createAssignment('New Assignment', 'Description', '', 'html');
      });

      expect(createResult).toBe(false);
      expect(result.current.error).toBe('Due date is required');
    });

    it('rejects creation with invalid courseType before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const createResult = await act(async () => {
        return await result.current.createAssignment('New Assignment', '', '2026-12-31', 'invalidcourse');
      });

      expect(createResult).toBe(false);
      expect(result.current.error).toBe('Invalid course type');
    });

    it('rejects creation with title exceeding 255 characters', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));
      const longTitle = 'a'.repeat(256);

      const createResult = await act(async () => {
        return await result.current.createAssignment(longTitle, 'Description', '2026-12-31', 'html');
      });

      expect(createResult).toBe(false);
      expect(result.current.error).toBe('Assignment title cannot exceed 255 characters');
    });

    it('accepts valid assignment creation', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      // Set up handlers for both POST and GET requests
      server.use(
        http.post('*/api/assignments', () => {
          return HttpResponse.json({ success: true }, { status: 201 });
        }),
        http.get('*/api/assignments/admin/all', () => {
          return HttpResponse.json({ assignments: [] });
        })
      );

      const createResult = await act(async () => {
        return await result.current.createAssignment('Valid Title', 'Description', '2026-12-31', 'react');
      });

      expect(createResult).toBe(true);
      expect(result.current.error).toBeNull();
    });
    it('surfaces a server error when the create request fails', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      server.use(
        http.post('*/api/assignments', () => {
          return HttpResponse.json({ message: 'Course is archived' }, { status: 400 });
        })
      );

      const createResult = await act(async () => {
        return await result.current.createAssignment('Valid Title', 'Description', '2026-12-31', 'react');
      });

      expect(createResult).toBe(false);
      expect(result.current.error).toBe('Course is archived');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('Validation - updateAssignment', () => {
    const TOKEN = 'test-token';

    it('rejects update with empty title before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const updateResult = await act(async () => {
        return await result.current.updateAssignment('1', '', 'Description', '2026-12-31', 'html');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Assignment title cannot be empty');
    });

    it('rejects update with missing dueDate before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const updateResult = await act(async () => {
        return await result.current.updateAssignment('1', 'Updated title', 'Description', '', 'html');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Due date is required');
    });

    it('rejects update with invalid courseType before API call', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      const updateResult = await act(async () => {
        return await result.current.updateAssignment('1', 'Updated title', '', '2026-12-31', 'invalidcourse');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Invalid course type');
    });

    it('accepts a valid assignment update and refreshes the list', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      server.use(
        http.put('*/api/assignments/1', () => {
          return HttpResponse.json({ success: true });
        }),
        http.get('*/api/assignments/admin/all', () => {
          return HttpResponse.json({
            assignments: [{ id: '1', title: 'Updated title', courseId: 'html' }],
          });
        })
      );

      const updateResult = await act(async () => {
        return await result.current.updateAssignment('1', 'Updated title', 'Description', '2026-12-31', 'html');
      });

      expect(updateResult).toBe(true);
      expect(result.current.error).toBeNull();
      await waitFor(() => {
        expect(result.current.allAssignments).toHaveLength(1);
      });
      expect(result.current.allAssignments[0].title).toBe('Updated title');
    });

    it('surfaces a server error when the update request fails', async () => {
      const { result } = renderHook(() => useAssignments(TOKEN));

      server.use(
        http.put('*/api/assignments/1', () => {
          return HttpResponse.json({ message: 'Assignment locked' }, { status: 409 });
        })
      );

      const updateResult = await act(async () => {
        return await result.current.updateAssignment('1', 'Updated title', 'Description', '2026-12-31', 'html');
      });

      expect(updateResult).toBe(false);
      expect(result.current.error).toBe('Assignment locked');
      expect(result.current.loading).toBe(false);
    });
  });

  describe('deleteAssignment', () => {
    const TOKEN = 'test-token';

    it('deletes an assignment and removes it from allAssignments', async () => {
      server.use(
        http.get('*/api/assignments/admin/all', () => {
          return HttpResponse.json({
            assignments: [
              { id: '1', title: 'To be deleted', courseId: 'html' },
              { id: '2', title: 'Stays around', courseId: 'react' },
            ],
          });
        }),
        http.delete('*/api/assignments/1', () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      const { result } = renderHook(() => useAssignments(TOKEN));

      // Seed state via the admin "fetch all" path before deleting
      await act(async () => {
        await result.current.fetchAllAssignments();
      });
      expect(result.current.allAssignments).toHaveLength(2);

      let deleteResult;
      await act(async () => {
        deleteResult = await result.current.deleteAssignment('1');
      });

      expect(deleteResult).toBe(true);
      expect(result.current.allAssignments).toHaveLength(1);
      expect(result.current.allAssignments[0].id).toBe('2');
      expect(result.current.error).toBeNull();
    });

    it('surfaces a server error when the delete request fails and keeps state unchanged', async () => {
      server.use(
        http.get('*/api/assignments/admin/all', () => {
          return HttpResponse.json({
            assignments: [{ id: '1', title: 'Protected', courseId: 'html' }],
          });
        }),
        http.delete('*/api/assignments/1', () => {
          return HttpResponse.json({ message: 'Cannot delete a graded assignment' }, { status: 403 });
        })
      );

      const { result } = renderHook(() => useAssignments(TOKEN));

      await act(async () => {
        await result.current.fetchAllAssignments();
      });

      let deleteResult;
      await act(async () => {
        deleteResult = await result.current.deleteAssignment('1');
      });

      expect(deleteResult).toBe(false);
      expect(result.current.error).toBe('Cannot delete a graded assignment');
      // State is untouched because the delete failed
      expect(result.current.allAssignments).toHaveLength(1);
    });
  });

  describe('gradeAssignment - server error path', () => {
    const TOKEN = 'test-token';

    it('surfaces a server error when the grade request fails', async () => {
      server.use(
        http.put('*/api/assignments/1/grade', () => {
          return HttpResponse.json({ message: 'Grading window closed' }, { status: 400 });
        })
      );

      const { result } = renderHook(() => useAssignments(TOKEN));

      const gradeResult = await act(async () => {
        return await result.current.gradeAssignment('1', 85, 'Great job');
      });

      expect(gradeResult).toBe(false);
      expect(result.current.error).toBe('Grading window closed');
      expect(result.current.loading).toBe(false);
    });
  });
});