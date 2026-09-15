import { z } from 'zod';

export const quizAnswerSchema = z.object({
  questionId: z.number().int().nonnegative('Question ID must be a non-negative integer'),
  selectedOption: z.number().int().nonnegative('Selected option index must be non-negative'),
  correctAnswer: z.number().int().nonnegative('Correct answer index must be non-negative'),
});

export const quizAttemptSchema = z.object({
  topic: z.string().min(1, 'Quiz topic is required'),
  score: z.number().min(0, 'Score cannot be negative').max(100, 'Score cannot exceed 100'),
  total: z.number().int().positive('Total questions must be a positive integer'),
  timeTaken: z.number().nonnegative('Time taken must be non-negative'),
  answers: z.array(quizAnswerSchema).optional(),
});