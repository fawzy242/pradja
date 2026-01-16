import React from 'react';
import PropTypes from 'prop-types';

/**
 * CardBody Component
 * Body/content section for Card component
 */
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`card__body ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CardBody;
