import { describe, it, expect } from 'vitest';
import { quizAttemptSchema } from './quiz';

describe('Quiz Attempt Schema Validation', () => {
  it('passes for a valid quiz submission payload', () => {
    const validPayload = {
      quizId: 'react-basics',
      score: 85,
      answers: [{ questionId: 1, selectedOption: 0 }],
    };

    const result = quizAttemptSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('fails when score is out of bounds', () => {
    const invalidPayload = {
      quizId: 'react-basics',
      score: 150,
      answers: [{ questionId: 1, selectedOption: 0 }],
    };

    const result = quizAttemptSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it('fails when answers array is empty', () => {
    const invalidPayload = {
      quizId: 'react-basics',
      score: 90,
      answers: [],
    };

    const result = quizAttemptSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });
});