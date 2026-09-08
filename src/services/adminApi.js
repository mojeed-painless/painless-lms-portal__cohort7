/**
 * Admin API Service
 * Handles all admin-related API calls for user management and course access control
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users/admin`;

/**
 * Fetch all pending (unapproved) users
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} Array of pending users
 */
export async function fetchPendingUsers(token) {
  if (!token) throw new Error('Authorization token is required');
  
  const response = await fetch(`${API_URL}/pending`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch pending users');
  }

  return await response.json();
}

/**
 * Fetch all approved users
 * @param {string} token - Authorization token
 * @returns {Promise<Array>} Array of all users
 */
export async function fetchAllUsers(token) {
  if (!token) throw new Error('Authorization token is required');

  const response = await fetch(`${API_URL}/all`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch all users');
  }

  return await response.json();
}

/**
 * Update a user's information (approval status, role, course access)
 * @param {string} userId - User ID to update
 * @param {Object} updateData - Data to update (isApproved, role, htmlAccess, jsAccess, reactAccess)
 * @param {string} token - Authorization token
 * @returns {Promise<Object>} Updated user data
 */
export async function updateUser(userId, updateData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to update user');
  }

  return await response.json();
}

/**
 * Delete a user
 * @param {string} userId - User ID to delete
 * @param {string} token - Authorization token
 * @returns {Promise<Object>} Deletion response
 */
export async function deleteUser(userId, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  const response = await fetch(`${API_URL}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to delete user');
  }

  return await response.json();
}

/**
 * Update course access for a user
 * @param {string} userId - User ID
 * @param {Object} courseAccessData - Object with htmlAccess, jsAccess, reactAccess booleans
 * @param {string} token - Authorization token
 * @returns {Promise<Object>} Updated user data
 */
export async function updateCourseAccess(userId, courseAccessData, token) {
  if (!token) throw new Error('Authorization token is required');
  if (!userId) throw new Error('User ID is required');

  return updateUser(userId, courseAccessData, token);
}
