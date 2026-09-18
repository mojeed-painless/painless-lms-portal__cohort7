import { useState } from 'react';
import { fetchJson } from '../services/apiClient';
import { assignmentSubmissionSchema } from '../schemas/assignment';
import { logError } from '../utils/logger';

export function useAssignmentMutations() {
  const [submitting, setSubmitting] = useState(false);

  const submitAssignment = async (payload) => {
    setSubmitting(true);
    try {
      // Lightweight validation: ensure `assignmentId` provided.
      if (!payload || !payload.assignmentId) {
        throw new Error('Invalid payload');
      }
      return await fetchJson(`/assignments/${payload.assignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch (err) {
      logError('Assignment submission error', { error: err.message || String(err) });
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const gradeAssignment = async (submissionId, score) => {
    try {
      return await fetchJson(`/admin/submissions/${submissionId}/grade`, {
        method: 'PATCH',
        body: JSON.stringify({ score }),
      });
    } catch (err) {
      logError('Assignment grading error', { error: err.message });
      throw err;
    }
  };

  return { submitAssignment, gradeAssignment, submitting };
}
