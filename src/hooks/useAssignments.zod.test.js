import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// We'll mock the assignment schemas to throw different error shapes
vi.mock('../schemas/assignment', () => ({
  assignmentSubmissionSchema: { parse: vi.fn() },
}));

import { assignmentSubmissionSchema } from '../schemas/assignment';
import { useAssignments } from './useAssignments';

describe('useAssignments extractZodMessage branches via submitAssignment', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles Zod-like issues array', async () => {
    assignmentSubmissionSchema.parse.mockImplementation(() => {
      const err = { issues: [{ message: 'Issue A' }] };
      throw err;
    });

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      try {
        await result.current.submitAssignment('1', {});
      } catch (e) {
        // expected
      }
    });

    expect(result.current.error).toBe('Issue A');
  });

  it('handles thrown array of errors', async () => {
    assignmentSubmissionSchema.parse.mockImplementation(() => {
      throw [{ message: 'Array error' }];
    });

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      try {
        await result.current.submitAssignment('1', {});
      } catch (e) {}
    });

    expect(result.current.error).toBe('Array error');
  });

  it('handles Error with JSON-array message', async () => {
    const payload = JSON.stringify([{ message: 'JSON message' }]);
    assignmentSubmissionSchema.parse.mockImplementation(() => {
      const err = new Error(payload);
      throw err;
    });

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      try {
        await result.current.submitAssignment('1', {});
      } catch (e) {}
    });

    expect(result.current.error).toBe('JSON message');
  });

  it('falls back to raw message for plain Error', async () => {
    assignmentSubmissionSchema.parse.mockImplementation(() => {
      throw new Error('Plain error');
    });

    const { result } = renderHook(() => useAssignments());

    await act(async () => {
      try {
        await result.current.submitAssignment('1', {});
      } catch (e) {}
    });

    expect(result.current.error).toBe('Plain error');
  });
});
