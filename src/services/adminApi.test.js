/**
 * Admin API Service Tests
 * Tests for admin user management API calls using MSW (Mock Service Worker)
 */

import { describe, it, expect, afterEach } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import {
  fetchPendingUsers,
  fetchAllUsers,
  updateUser,
  deleteUser,
  updateCourseAccess,
} from './adminApi';

const API_BASE = 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users/admin`;
const TOKEN = 'test-token-12345';

// Reset handlers after each test
afterEach(() => server.resetHandlers());

describe('Admin API Service', () => {
  describe('fetchPendingUsers', () => {
    it('should successfully fetch pending users', async () => {
      const mockPendingUsers = [
        { _id: '1', email: 'pending1@example.com', isApproved: false },
        { _id: '2', email: 'pending2@example.com', isApproved: false },
      ];

      server.use(
        http.get(`${API_URL}/pending`, () => {
          return HttpResponse.json(mockPendingUsers);
        })
      );

      const result = await fetchPendingUsers(TOKEN);

      expect(result).toEqual(mockPendingUsers);
      expect(result.length).toBe(2);
    });

    it('should throw error when fetch fails', async () => {
      server.use(
        http.get(`${API_URL}/pending`, () => {
          return HttpResponse.json(
            { message: 'Unauthorized' },
            { status: 401 }
          );
        })
      );

      await expect(fetchPendingUsers(TOKEN)).rejects.toThrow('Unauthorized');
    });

    it('should throw error when token is missing', async () => {
      await expect(fetchPendingUsers(null)).rejects.toThrow(
        'Authorization token is required'
      );
    });

    it('should return empty array when no pending users', async () => {
      server.use(
        http.get(`${API_URL}/pending`, () => {
          return HttpResponse.json([]);
        })
      );

      const result = await fetchPendingUsers(TOKEN);

      expect(result).toEqual([]);
    });
  });

  describe('fetchAllUsers', () => {
    it('should successfully fetch all users', async () => {
      const mockAllUsers = [
        { _id: '1', email: 'user1@example.com', isApproved: true, role: 'student' },
        { _id: '2', email: 'user2@example.com', isApproved: true, role: 'student' },
        { _id: '3', email: 'admin@example.com', isApproved: true, role: 'admin' },
      ];

      server.use(
        http.get(`${API_URL}/all`, () => {
          return HttpResponse.json(mockAllUsers);
        })
      );

      const result = await fetchAllUsers(TOKEN);

      expect(result).toEqual(mockAllUsers);
      expect(result.length).toBe(3);
    });

    it('should throw error when fetch fails', async () => {
      server.use(
        http.get(`${API_URL}/all`, () => {
          return HttpResponse.json(
            { message: 'Failed to fetch users' },
            { status: 500 }
          );
        })
      );

      await expect(fetchAllUsers(TOKEN)).rejects.toThrow(
        'Failed to fetch users'
      );
    });

    it('should throw error when token is missing', async () => {
      await expect(fetchAllUsers(null)).rejects.toThrow(
        'Authorization token is required'
      );
    });
  });

  describe('updateUser', () => {
    it('should successfully update user approval status', async () => {
      const userId = 'user-123';
      const updateData = { isApproved: true };
      const mockResponse = { _id: userId, isApproved: true, email: 'test@example.com' };

      server.use(
        http.put(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await updateUser(userId, updateData, TOKEN);

      expect(result).toEqual(mockResponse);
      expect(result.isApproved).toBe(true);
    });

    it('should successfully update user role', async () => {
      const userId = 'user-123';
      const updateData = { role: 'instructor' };
      const mockResponse = { _id: userId, role: 'instructor', email: 'test@example.com' };

      server.use(
        http.put(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await updateUser(userId, updateData, TOKEN);

      expect(result).toEqual(mockResponse);
      expect(result.role).toBe('instructor');
    });

    it('should throw error when userId is missing', async () => {
      await expect(updateUser(null, {}, TOKEN)).rejects.toThrow(
        'User ID is required'
      );
    });

    it('should throw error when token is missing', async () => {
      await expect(updateUser('user-123', {}, null)).rejects.toThrow(
        'Authorization token is required'
      );
    });

    it('should handle update errors', async () => {
      const userId = 'user-123';
      const updateData = { isApproved: true };

      server.use(
        http.put(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        })
      );

      await expect(updateUser(userId, updateData, TOKEN)).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('deleteUser', () => {
    it('should successfully delete a user', async () => {
      const userId = 'user-123';
      const mockResponse = { message: 'User deleted successfully', _id: userId };

      server.use(
        http.delete(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await deleteUser(userId, TOKEN);

      expect(result).toEqual(mockResponse);
      expect(result.message).toContain('deleted');
    });

    it('should throw error when userId is missing', async () => {
      await expect(deleteUser(null, TOKEN)).rejects.toThrow(
        'User ID is required'
      );
    });

    it('should throw error when token is missing', async () => {
      await expect(deleteUser('user-123', null)).rejects.toThrow(
        'Authorization token is required'
      );
    });

    it('should handle delete errors', async () => {
      const userId = 'user-123';

      server.use(
        http.delete(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(
            { message: 'User not found' },
            { status: 404 }
          );
        })
      );

      await expect(deleteUser(userId, TOKEN)).rejects.toThrow(
        'User not found'
      );
    });
  });

  describe('updateCourseAccess', () => {
    it('should successfully update htmlAccess', async () => {
      const userId = 'user-123';
      const courseAccessData = { htmlAccess: true };
      const mockResponse = { _id: userId, htmlAccess: true, email: 'test@example.com' };

      server.use(
        http.put(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await updateCourseAccess(userId, courseAccessData, TOKEN);

      expect(result).toEqual(mockResponse);
      expect(result.htmlAccess).toBe(true);
    });

    it('should successfully update multiple course accesses', async () => {
      const userId = 'user-123';
      const courseAccessData = {
        htmlAccess: true,
        jsAccess: false,
        reactAccess: true,
      };
      const mockResponse = {
        _id: userId,
        htmlAccess: true,
        jsAccess: false,
        reactAccess: true,
      };

      server.use(
        http.put(`${API_URL}/${userId}`, () => {
          return HttpResponse.json(mockResponse);
        })
      );

      const result = await updateCourseAccess(userId, courseAccessData, TOKEN);

      expect(result).toEqual(mockResponse);
      expect(result.htmlAccess).toBe(true);
      expect(result.jsAccess).toBe(false);
      expect(result.reactAccess).toBe(true);
    });

    it('should throw error when userId is missing', async () => {
      await expect(
        updateCourseAccess(null, { htmlAccess: true }, TOKEN)
      ).rejects.toThrow('User ID is required');
    });

    it('should throw error when token is missing', async () => {
      await expect(
        updateCourseAccess('user-123', { htmlAccess: true }, null)
      ).rejects.toThrow('Authorization token is required');
    });
  });
});
