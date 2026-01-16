import React from 'react';
import PropTypes from 'prop-types';
import './LoadingFallback.scss';

/**
 * LoadingFallback Component
 * Loading state component for lazy-loaded components
 */
const LoadingFallback = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`loading-fallback ${fullScreen ? 'loading-fallback--fullscreen' : ''}`}>
      <div className="loading-fallback__content">
        <div className="loading-fallback__spinner">
          <div className="spinner"></div>
        </div>
        {message && <p className="loading-fallback__message">{message}</p>}
      </div>
    </div>
  );
};

LoadingFallback.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default LoadingFallback;
