import { fetchJson } from './apiClient';
import { userListSchema, userSchema, updateCourseAccessSchema } from '../schemas/user';
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
 */
export async function updateUser(userId, updateData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

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
 */
export async function updateCourseAccess(userId, courseAccessData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  try {
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
