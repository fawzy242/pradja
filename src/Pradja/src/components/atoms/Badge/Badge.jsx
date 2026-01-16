import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge Component (Atom)
 * Small label or indicator for status, count, or category
 */
const Badge = ({
  children,
  variant = 'default',
  size = 'medium',
  dot = false,
  max = 99,
  className = '',
  ...rest
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    dot && 'badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderContent = () => {
    if (dot) {
      return null;
    }
    
    if (typeof children === 'number' && children > max) {
      return `${max}+`;
    }
    
    return children;
  };

  return (
    <span className={badgeClasses} {...rest}>
      {renderContent()}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  dot: PropTypes.bool,
  max: PropTypes.number,
  className: PropTypes.string,
};

export default Badge;
