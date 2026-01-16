import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider, ThemeProvider, ToastProvider, ModalProvider } from '../contexts';

/**
 * AppProviders Component
 * Wraps the app with all global context providers
 * 
 * Provider Order (from outer to inner):
 * 1. ThemeProvider - Theme management (should be outermost for styling)
 * 2. AuthProvider - Authentication state
 * 3. ToastProvider - Toast notifications
 * 4. ModalProvider - Modal management
 * 
 * @component
 * @example
 * <AppProviders>
 *   <App />
 * </AppProviders>
 */
const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
