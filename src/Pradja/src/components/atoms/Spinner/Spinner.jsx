import React from 'react';
import PropTypes from 'prop-types';

/**
 * Spinner Component (Atom)
 * Loading indicator with different sizes and variants
 */
const Spinner = ({
  size = 'medium',
  variant = 'primary',
  label = 'Loading...',
  className = '',
  ...rest
}) => {
  const spinnerClasses = [
    'spinner',
    `spinner--${size}`,
    `spinner--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="spinner-wrapper" role="status" aria-live="polite" {...rest}>
      <span className={spinnerClasses} aria-hidden="true">
        <span className="spinner__circle"></span>
      </span>
      <span className="spinner__label visually-hidden">{label}</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'light', 'dark']),
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Spinner;
