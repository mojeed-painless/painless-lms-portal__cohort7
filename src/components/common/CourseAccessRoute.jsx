import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component that checks if the user has access to a specific course.
 * Even if a user is authenticated and approved, they need admin permission to access course content.
 * If access is denied, it redirects the user to the catalog page.
 * 
 * @param {string} courseType - The course type to check access for: 'html', 'js', or 'react'
 *   - 'html': Covers all HTML, CSS, and JavaScript content
 *   - 'js': Advanced JavaScript content
 *   - 'react': React content
 */
const CourseAccessRoute = ({ courseType }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="loading-overlay" aria-live="polite" aria-busy="true">
        <div className="spinner" role="status" aria-label="Loading">
          <div className="ring ring1" />
          <div className="ring ring2" />
          <div className="ring ring3" />
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  // Map course type to the corresponding access field
  const accessFieldMap = {
    html: 'htmlAccess',
    js: 'jsAccess',
    react: 'reactAccess'
  };

  const accessField = accessFieldMap[courseType];
  const hasAccess = user?.[accessField] === true;

  if (hasAccess) {
    return <Outlet />;
  }

  // If user doesn't have access to the course, redirect to catalog
  return <Navigate to="/no-access" state={{ from: location, reason: 'course_locked' }} replace />;
};

export default CourseAccessRoute;
