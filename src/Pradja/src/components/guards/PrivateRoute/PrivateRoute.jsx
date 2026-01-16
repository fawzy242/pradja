import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ROUTES } from '@/config/routes';

/**
 * PrivateRoute Component (Auth Guard)
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 * 
 * @component
 * @example
 * <PrivateRoute>
 *   <AdminDashboard />
 * </PrivateRoute>
 */
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated
  // In production, this should check a proper auth token/session
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  };

  // If not authenticated, redirect to login with return URL
  if (!isAuthenticated()) {
    return (
      <Navigate
        to={ROUTES.ADMIN_LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // If authenticated, render the protected content
  return children;
};

PrivateRoute.propTypes = {
  /** Protected content/component */
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
