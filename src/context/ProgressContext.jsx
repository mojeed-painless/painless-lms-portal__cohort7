import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ProgressContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users`;

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  // Initialize as empty - will load after user is loaded
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress when user is available
  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    const loadProgress = async () => {
      try {
        // First, try to load from localStorage with the correct user ID
        const saved = localStorage.getItem(`progress_${user._id}`);
        if (saved) {
          setCompletedLessons(JSON.parse(saved));
        }

        // Then fetch from backend to ensure sync across devices
        if (!user?.token) {
          setIsLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get(`${API_URL}/progress`, config);
        const serverProgress = data.completedLessons || [];
        
        // Use server data and update localStorage
        setCompletedLessons(serverProgress);
        localStorage.setItem(`progress_${user._id}`, JSON.stringify(serverProgress));
      } catch (err) {
        console.warn('Could not fetch progress from server:', err.message);
        // If server fails, keep localStorage data (already loaded above)
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, [user?._id, user?.token]);

  // Save to localStorage whenever completedLessons changes (only if user is loaded)
  useEffect(() => {
    if (user?._id && !isLoading && completedLessons.length > 0) {
      localStorage.setItem(`progress_${user._id}`, JSON.stringify(completedLessons));
    }
  }, [completedLessons, user?._id, isLoading]);

  // Mark a lesson as complete and sync with backend
  const markLessonComplete = async (lessonPath) => {
    // Create updated array immediately
    const updatedLessons = completedLessons.includes(lessonPath) 
      ? completedLessons 
      : [...completedLessons, lessonPath];

    // Update UI immediately (optimistic update)
    setCompletedLessons(updatedLessons);

    // Sync with backend using the updated array
    if (!user?._id || !user?.token) {
      console.warn('Cannot sync progress: user not authenticated');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(
        `${API_URL}/progress`,
        { completedLessons: updatedLessons },
        config
      );
    } catch (err) {
      console.error('Error syncing progress to backend:', err.message);
      // Progress is still saved locally, will sync on next login
    }
  };

  // Check if a lesson is completed
  const isLessonComplete = (lessonPath) => {
    return completedLessons.includes(lessonPath);
  };

  // Get total completed lessons count
  const getCompletedCount = () => {
    return completedLessons.length;
  };

  // Get completion percentage
  const getCompletionPercentage = (totalLessons) => {
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  const value = {
    completedLessons,
    markLessonComplete,
    isLessonComplete,
    getCompletedCount,
    getCompletionPercentage,
    isLoading,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
