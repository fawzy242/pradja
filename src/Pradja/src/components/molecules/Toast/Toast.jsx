import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Toast Component
 * Notification toast message
 */
const Toast = ({ 
  id,
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose(id);
    }
  };

  return (
    <div className={`toast toast--${type}`} role="alert">
      <div className="toast__content">
        <p className="toast__message">{message}</p>
      </div>
      <button 
        className="toast__close" 
        onClick={handleClose}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Toast;
