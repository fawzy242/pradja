import React from 'react';
import PropTypes from 'prop-types';

/**
 * Icon Component (Atom)
 * Wrapper for icons with consistent sizing and coloring
 */
const Icon = ({
  children,
  name,
  size = 'medium',
  color,
  className = '',
  ...rest
}) => {
  const iconClasses = [
    'icon',
    `icon--${size}`,
    color && `icon--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span 
      className={iconClasses}
      aria-label={name}
      role="img"
      {...rest}
    >
      {children}
    </span>
  );
};

Icon.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'muted',
  ]),
  className: PropTypes.string,
};

export default Icon;
