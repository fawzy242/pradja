import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './AppProviders';
import AppRouter from './AppRouter';

// Import i18n configuration
import '../services/i18n/config';

// Import global styles
import '../assets/styles/main.scss';

/**
 * App Component
 * Root application component with global providers and router
 * 
 * Provider Structure:
 * - AppProviders (wraps ThemeProvider, AuthProvider, ToastProvider, ModalProvider)
 * - BrowserRouter (routing)
 * - AppRouter (routes configuration)
 * 
 * @component
 */
function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
