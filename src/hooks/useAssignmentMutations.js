import { useState } from 'react';
import { fetchJson } from '../services/apiClient';
import { assignmentSubmissionSchema } from '../schemas/assignment';
import { logError } from '../utils/logger';

export function useAssignmentMutations() {
  const [submitting, setSubmitting] = useState(false);

  const submitAssignment = async (payload) => {
    setSubmitting(true);
    try {
      const validated = assignmentSubmissionSchema.parse(payload);
      return await fetchJson(`/assignments/${validated.assignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(validated),
      });
    } catch (err) {
      logError('Assignment submission error', { error: err.message });
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
