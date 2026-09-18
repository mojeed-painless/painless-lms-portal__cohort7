import { describe, it, expect } from 'vitest';
import { quizAttemptSchema, quizAnswerSchema } from './quiz';

describe('Quiz Zod Validation Schemas', () => {
  describe('quizAnswerSchema', () => {
    it('validates correct answer payload', () => {
      const valid = { questionId: 101, selectedOption: 2, correctAnswer: 2 };
      expect(quizAnswerSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects negative indices', () => {
      const invalid = { questionId: -1, selectedOption: 0, correctAnswer: 0 };
      expect(quizAnswerSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('quizAttemptSchema', () => {
    it('validates correct attempt payload', () => {
      const valid = {
        topic: 'React Fundamentals',
        score: 85,
        total: 10,
        timeTaken: 120,
        answers: [{ questionId: 1, selectedOption: 0, correctAnswer: 0 }],
      };
      expect(quizAttemptSchema.safeParse(valid).success).toBe(true);
    });

    it('rejects missing topic or invalid score bounds', () => {
      const invalid = { topic: '', score: 105, total: 10, timeTaken: -5 };
      const result = quizAttemptSchema.safeParse(invalid);
      expect(result.success).toBe(false);
    });
  });
});
