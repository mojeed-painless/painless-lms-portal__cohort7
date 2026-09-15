import { z } from 'zod';

export const quizAttemptSchema = z.object({
  quizId: z.string().min(1, 'Quiz ID is required'),
  score: z.number().min(0, 'Score cannot be negative').max(100, 'Score cannot exceed 100'),
  answers: z.array(
    z.object({
      questionId: z.number(),
      selectedOption: z.number().min(0),
    })
  ).min(1, 'At least one answer must be submitted'),
});