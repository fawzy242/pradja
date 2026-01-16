import React from 'react';
import PropTypes from 'prop-types';

/**
 * Divider Component (Atom)
 * Visual separator between content sections
 */
const Divider = ({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'medium',
  children,
  className = '',
  ...rest
}) => {
  const dividerClasses = [
    'divider',
    `divider--${orientation}`,
    `divider--${variant}`,
    `divider--spacing-${spacing}`,
    children && 'divider--with-content',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (children) {
    return (
      <div className={dividerClasses} role="separator" {...rest}>
        <span className="divider__line" />
        <span className="divider__content">{children}</span>
        <span className="divider__line" />
      </div>
    );
  }

  return (
    <hr className={dividerClasses} role="separator" {...rest} />
  );
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  variant: PropTypes.oneOf(['solid', 'dashed', 'dotted']),
  spacing: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Divider;
