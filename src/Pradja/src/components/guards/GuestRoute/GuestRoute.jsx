import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '@/config/routes';

/**
 * GuestRoute Component (Guest Guard)
 * Prevents authenticated users from accessing auth pages (login, register)
 * Redirects to dashboard if already authenticated
 * 
 * @component
 * @example
 * <GuestRoute>
 *   <LoginPage />
 * </GuestRoute>
 */
const GuestRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  };

  // If authenticated, redirect to intended destination or dashboard
  if (isAuthenticated()) {
    // Get the intended destination from location state
    const from = location.state?.from?.pathname || ROUTES.ADMIN_DASHBOARD;
    return <Navigate to={from} replace />;
  }

  // If not authenticated, render the auth content
  return children;
};

GuestRoute.propTypes = {
  /** Auth page content (login, register, etc.) */
  children: PropTypes.node.isRequired,
};

export default GuestRoute;
