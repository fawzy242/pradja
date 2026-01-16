import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card Component
 * Flexible card container for content
 */
const Card = ({ 
  children, 
  className = '', 
  padding = 'default',
  shadow = true,
  hover = false,
  ...props 
}) => {
  const cardClasses = [
    'card',
    className,
    `card--padding-${padding}`,
    shadow && 'card--shadow',
    hover && 'card--hover'
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padding: PropTypes.oneOf(['none', 'small', 'default', 'large']),
  shadow: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Card;

// Export subcomponents from separate files
export { default as CardHeader } from './CardHeader';
export { default as CardBody } from './CardBody';
export { default as CardFooter } from './CardFooter';
