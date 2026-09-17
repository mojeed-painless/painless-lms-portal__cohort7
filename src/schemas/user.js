import { z } from 'zod';

export const userRoleSchema = z.enum(['student', 'instructor', 'admin']);

export const userStatusSchema = z.enum(['active', 'pending', 'suspended']);

export const userSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  role: userRoleSchema.default('student'),
  status: userStatusSchema.default('active'),
  courseAccess: z.array(z.string()).default([]),
});

export const updateCourseAccessSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  accessList: z.array(z.string()),
});

export const userListSchema = z.array(userSchema);
