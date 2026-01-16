import React from 'react';
import { FiHome } from 'react-icons/fi';
import PropTypes from 'prop-types';

/**
 * PropertyImagePlaceholder Component
 * Beautiful gradient placeholder for property images
 * Replaces via.placeholder.com which is often blocked
 */
const PropertyImagePlaceholder = ({ 
  type = 'property',
  index = 1,
  className = '',
  aspectRatio = '4/3'
}) => {
  // Different gradients for variety
  const gradients = [
    'linear-gradient(135deg, #1a4d2e 0%, #2d7a4d 100%)', // Green
    'linear-gradient(135deg, #c8a882 0%, #d4b896 100%)', // Gold
    'linear-gradient(135deg, #1a4d2e 0%, #c8a882 100%)', // Green to Gold
    'linear-gradient(135deg, #2d7a4d 0%, #1a4d2e 100%)', // Dark Green
  ];

  const gradient = gradients[index % gradients.length];

  const icons = {
    property: FiHome,
    agent: FiHome,
    office: FiHome,
  };

  const Icon = icons[type] || FiHome;

  return (
    <div 
      className={`image-placeholder ${className}`}
      style={{
        background: gradient,
        aspectRatio: aspectRatio,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div 
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: '-50px',
          left: '-50px',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          bottom: '-30px',
          right: '-30px',
        }}
      />
      
      {/* Icon */}
      <Icon 
        style={{
          width: '64px',
          height: '64px',
          color: 'rgba(255, 255, 255, 0.3)',
          zIndex: 1,
        }}
      />
    </div>
  );
};

PropertyImagePlaceholder.propTypes = {
  type: PropTypes.oneOf(['property', 'agent', 'office']),
  index: PropTypes.number,
  className: PropTypes.string,
  aspectRatio: PropTypes.string,
};

export default PropertyImagePlaceholder;
