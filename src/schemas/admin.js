import { z } from 'zod';

export const updateUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email address format').optional(),
  role: z.enum(['student', 'instructor', 'admin'], {
    errorMap: () => ({ message: 'Role must be student, instructor, or admin' }),
  }).optional(),
  isActive: z.boolean().optional(),
}).passthrough(); // Allow additional fields like isApproved

export const updateCourseAccessSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  action: z.enum(['grant', 'revoke'], {
    errorMap: () => ({ message: 'Action must be grant or revoke' }),
  }),
  expiresAt: z.string().datetime().optional().nullable(),
});
