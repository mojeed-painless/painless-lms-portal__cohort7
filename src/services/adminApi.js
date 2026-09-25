import { fetchJson } from './apiClient';
import { userListSchema, userSchema, updateCourseAccessSchema } from '../schemas/user';
import { updateUserSchema, updateCourseAccessSchema as adminUpdateCourseAccessSchema } from '../schemas/admin';
import { logError } from '../utils/logger';

/**
 * Fetch all pending (unapproved) users
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} Array of pending users
 */
export async function fetchPendingUsers(token) {
  if (!token) throw new Error('Authorization token is required');

  try {
    const data = await fetchJson('/users/admin/pending', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const list = Array.isArray(data) ? data : data.users || [];
    return list;
  } catch (err) {
    logError('Failed to fetch pending users', { error: err?.message || String(err) });
    throw err;
  }
}

/**
 * Fetch all approved users
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} Array of all users
 */
export async function fetchAllUsers(token) {
  if (!token) throw new Error('Authorization token is required');

  try {
    const data = await fetchJson('/users/admin/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const list = Array.isArray(data) ? data : data.users || [];
    return list;
  } catch (err) {
    logError('Failed to fetch all users', { error: err?.message || String(err) });
    throw err;
  }
}

/**
 * Update a user's information (approval status, role, course access)
 * Validates input with Zod before making the network request.
 */
export async function updateUser(userId, updateData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  // Validate the payload shape and fields
  const payload = { userId, ...updateData };
  const parseResult = updateUserSchema.safeParse(payload);

  if (!parseResult.success) {
    const errorDetails = parseResult.error.errors.map((e) => e.message).join(', ');
    logError('Admin updateUser validation failed', { userId, errors: errorDetails });
    throw new Error(`Admin updateUser validation failed: ${errorDetails}`);
  }

  try {
    // Use PUT to match existing tests which expect PUT
    const data = await fetchJson(`/users/admin/${userId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(updateData),
    });

    return data;
  } catch (err) {
    logError('Failed to update user', { userId, error: err?.message || String(err) });
    throw err;
  }
}

/**
 * Delete a user
 */
export async function deleteUser(userId, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  try {
    const data = await fetchJson(`/users/admin/${userId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (err) {
    logError('Failed to delete user', { userId, error: err?.message || String(err) });
    throw err;
  }
}

/**
 * Update course access for a user
 * Validates input with Zod before making the network request.
 */
export async function updateCourseAccess(userId, courseAccessData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  try {
    // Validate using the legacy schema for backward compat with current tests
    const validated = updateCourseAccessSchema.parse({
      userId,
      accessList: Object.keys(courseAccessData).filter((k) => courseAccessData[k]),
    });
    
    // Tests expect a PUT to /users/admin/:id - align with that
    const data = await fetchJson(`/users/admin/${validated.userId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ accessList: validated.accessList }),
    });

    return data;
  } catch (err) {
    logError('Failed to update course access', { userId, error: err?.message || String(err) });
    throw err;
  }
}
