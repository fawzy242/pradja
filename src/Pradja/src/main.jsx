import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// Import global styles - CRITICAL!
import './assets/styles/main.scss';

/**
 * Main Entry Point
 * Vite application entry point
 * 
 * Features:
 * - React 18 with createRoot
 * - StrictMode for development checks
 * - Mounts to #root div in index.html
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
