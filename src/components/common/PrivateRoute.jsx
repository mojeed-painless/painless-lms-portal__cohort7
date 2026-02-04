import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * A wrapper component that checks for user authentication.
 * If authenticated, it renders the child route (Outlet).
 * If not, it redirects the user to the login page.
 */
const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
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

  if (isAuthenticated) {
    return <Outlet />;
  }

  // If not authenticated, redirect to login, preserving the current path
  // so the user can be redirected back after successful login.
  return <Navigate to="/home" state={{ from: location }} replace />;
};

export default PrivateRoute;