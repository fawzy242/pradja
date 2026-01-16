import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar Component (Atom)
 * User avatar with image, initials, or icon fallback
 */
const Avatar = ({
  src,
  alt = '',
  name,
  size = 'medium',
  shape = 'circle',
  status,
  icon,
  className = '',
  onClick,
  ...rest
}) => {
  const avatarClasses = [
    'avatar',
    `avatar--${size}`,
    `avatar--${shape}`,
    status && `avatar--status-${status}`,
    onClick && 'avatar--clickable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getInitials = (name) => {
    if (!name) return '';
    
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt || name}
          className="avatar__image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    
    if (icon) {
      return <span className="avatar__icon">{icon}</span>;
    }
    
    if (name) {
      return <span className="avatar__initials">{getInitials(name)}</span>;
    }
    
    return <span className="avatar__placeholder">?</span>;
  };

  return (
    <div
      className={avatarClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {renderContent()}
      {status && <span className="avatar__status" aria-label={`Status: ${status}`} />}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  shape: PropTypes.oneOf(['circle', 'square', 'rounded']),
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  icon: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
