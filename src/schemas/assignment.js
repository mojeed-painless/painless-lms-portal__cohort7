/**
 * Assignment Validation Schemas
 * Zod schemas for validating assignment-related payloads
 */

import { z } from 'zod';

/**
 * Schema for submitting an assignment
 * Validates submission URL and optional notes
 */
export const assignmentSubmissionSchema = z.object({
  submissionUrl: z
    .string('Submission URL is required')
    .url('Please provide a valid URL')
    .transform(url => url.trim()),
  notes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional()
    .default('')
    .transform(notes => notes?.trim() || ''),
});

/**
 * Schema for grading an assignment
 * Validates score (0-100) and optional feedback
 */
export const assignmentGradeSchema = z.object({
  score: z
    .union([z.string(), z.number()])
    .transform(val => (typeof val === 'string' ? parseInt(val, 10) : val))
    .refine(val => !isNaN(val), 'Score must be a valid number')
    .refine(val => val >= 0 && val <= 100, 'Score must be between 0 and 100'),
  feedback: z
    .string()
    .max(1000, 'Feedback cannot exceed 1000 characters')
    .optional()
    .default('')
    .transform(feedback => feedback?.trim() || ''),
});

/**
 * Schema for creating an assignment
 * Validates required fields for new assignments
 */
export const assignmentCreateSchema = z.object({
  title: z
    .string('Assignment title is required')
    .min(1, 'Assignment title cannot be empty')
    .max(255, 'Assignment title cannot exceed 255 characters')
    .transform(title => title.trim()),
  description: z
    .string()
    .max(2000, 'Description cannot exceed 2000 characters')
    .optional()
    .default('')
    .transform(desc => desc?.trim() || ''),
  dueDate: z
    .string('Due date is required')
    .min(1, 'Due date is required'),
  courseType: z
    .enum(['html', 'css', 'js', 'react'], 'Invalid course type'),
});

/**
 * Schema for updating an assignment
 * Same as create schema but all fields required
 */
export const assignmentUpdateSchema = assignmentCreateSchema;

/**
 * Schema for generic assignment payload (used in tests)
 */
export const assignmentPayloadSchema = z.object({
  answerText: z
    .string()
    .optional(),
  submissionUrl: z
    .string()
    .url()
    .optional(),
});
