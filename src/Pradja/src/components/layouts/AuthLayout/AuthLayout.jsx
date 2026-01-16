import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

/**
 * Auth Layout Component
 * Layout wrapper for authentication pages (login, register)
 */
const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__container">
        <div className="auth-layout__content">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
};

export default AuthLayout;
