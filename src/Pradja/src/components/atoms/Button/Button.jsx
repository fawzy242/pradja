import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button Component (Atom)
 * Reusable button with various variants, sizes, and states
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    icon && !children && 'btn--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="btn__spinner"></span>
          <span className="btn__text">{children || 'Loading...'}</span>
        </>
      );
    }

    if (icon && children) {
      return iconPosition === 'left' ? (
        <>
          <span className="btn__icon btn__icon--left">{icon}</span>
          <span className="btn__text">{children}</span>
        </>
      ) : (
        <>
          <span className="btn__text">{children}</span>
          <span className="btn__icon btn__icon--right">{icon}</span>
        </>
      );
    }

    if (icon && !children) {
      return <span className="btn__icon">{icon}</span>;
    }

    return <span className="btn__text">{children}</span>;
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'success',
    'danger',
    'warning',
    'info',
    'outline',
    'ghost',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default Button;
