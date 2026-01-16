import React from 'react';
import PropTypes from 'prop-types';

/**
 * CardFooter Component
 * Footer section for Card component
 */
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__footer ${className}`} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardFooter;
