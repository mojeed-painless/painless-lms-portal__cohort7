import { describe, it, expect } from 'vitest';
import { userSchema, userListSchema, updateCourseAccessSchema } from './user';

describe('User Zod Schemas', () => {
  it('parses valid user payloads accurately', () => {
    const validUser = {
      id: 'usr_100',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'student',
      status: 'active',
      courseAccess: ['course_react'],
    };

    const parsed = userSchema.parse(validUser);
    expect(parsed).toEqual(validUser);
  });

  it('rejects malformed user payloads missing required fields or invalid emails', () => {
    const invalidUser = {
      id: 'usr_101',
      name: '',
      email: 'not-an-email',
    };

    expect(() => userSchema.parse(invalidUser)).toThrow();
  });

  it('validates course access updates', () => {
    const validCourseUpdate = {
      userId: 'usr_100',
      accessList: ['course_react', 'course_node'],
    };

    expect(updateCourseAccessSchema.parse(validCourseUpdate)).toEqual(validCourseUpdate);
  });

  it('parses user lists correctly', () => {
    const validList = [
      { id: '1', name: 'User 1', email: 'u1@test.com' },
      { id: '2', name: 'User 2', email: 'u2@test.com' },
    ];

    expect(userListSchema.parse(validList)).toHaveLength(2);
  });
});
