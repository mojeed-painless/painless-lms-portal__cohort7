import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { isPathUnlocked } from '../../utils/htmlCourseUnlockConfig';

/**
 * Route guard for course content access.
 * - HTML content: Controlled by server-stored release day
 * - JS/React content: Requires specific access flags
 * - Admins bypass all restrictions
 */
const CourseAccessRoute = ({ courseType }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [releaseDay, setReleaseDay] = useState(0);
  const [isReleaseLoading, setIsReleaseLoading] = useState(courseType === 'html');

  // Fetch release day from server for HTML content
  useEffect(() => {
    if (courseType !== 'html') return;

    const fetchReleaseDay = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/config/html-release-day`);
        if (!response.ok) throw new Error('Failed to fetch release day');
        const data = await response.json();
        setReleaseDay(Number(data.value) || 0);
      } catch (error) {
        console.error('Error fetching release day:', error);
        setReleaseDay(0);
      } finally {
        setIsReleaseLoading(false);
      }
    };

    fetchReleaseDay();
  }, [courseType]);

  // Show loading while auth or release day is loading
  if (isLoading || isReleaseLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner">
          <div className="ring ring1" />
          <div className="ring ring2" />
          <div className="ring ring3" />
        </div>
      </div>
    );
  }

  // Admins have full access to non-HTML content, but HTML content is still restricted by release day
  if (user?.role === 'admin' && courseType !== 'html') {
    return <Outlet />;
  }

  // Check course-specific access
  if (courseType === 'html') {
    // HTML access is controlled by release day only
    if (!isPathUnlocked(location.pathname, releaseDay)) {
      return <Navigate to="/no-access" state={{ from: location, reason: 'content_locked' }} replace />;
    }
  } else {
    // JS and React require specific access flags
    const accessField = courseType === 'js' ? 'jsAccess' : 'reactAccess';
    if (!user?.[accessField]) {
      return <Navigate to="/no-access" state={{ from: location, reason: 'course_locked' }} replace />;
    }
  }

  return <Outlet />;
};

export default CourseAccessRoute;
