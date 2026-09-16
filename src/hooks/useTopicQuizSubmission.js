import { useState } from 'react';
import { quizAttemptSchema, quizAnswerSchema } from '../schemas/quiz';
import { fetchJson } from '../services/apiClient';
import { logError } from '../utils/logger';

export function useTopicQuizSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitAnswer = async (answerData) => {
    try {
      const validatedData = quizAnswerSchema.parse(answerData);
      return await fetchJson('/api/quiz-answers', {
        method: 'POST',
        body: JSON.stringify(validatedData),
      });
    } catch (err) {
      logError('Quiz Answer Validation Failure', { error: err?.message || String(err) });
      throw err;
    }
  };

  const submitAttempt = async (attemptData) => {
    setSubmitting(true);
    setError(null);
    try {
      const validatedData = quizAttemptSchema.parse(attemptData);
      const result = await fetchJson('/api/quiz-attempts', {
        method: 'POST',
        body: JSON.stringify(validatedData),
      });
      return result;
    } catch (err) {
      logError('Quiz Attempt Validation Failure', { error: err?.message || String(err) });
      setError(err?.message || String(err));
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitAnswer, submitAttempt, submitting, error };
}

export default useTopicQuizSubmission;
