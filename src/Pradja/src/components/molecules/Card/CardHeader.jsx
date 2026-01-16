import React from 'react';
import PropTypes from 'prop-types';

/**
 * CardHeader Component
 * Header section for Card component
 */
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__header ${className}`} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardHeader;
