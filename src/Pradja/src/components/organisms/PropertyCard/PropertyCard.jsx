import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card } from '../../molecules';
import { Badge, Button } from '../../atoms';

/**
 * PropertyCard Component (Organism)
 * Display property information in card format
 */
const PropertyCard = ({
  property,
  onFavorite,
  onContact,
  showActions = true,
  className = '',
}) => {
  const {
    id,
    title,
    location,
    price,
    type,
    status,
    bedrooms,
    bathrooms,
    area,
    images,
    isFeatured,
    isNew,
  } = property;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const propertyCardClasses = [
    'property-card',
    isFeatured && 'property-card--featured',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Card
      className={propertyCardClasses}
      image={images?.[0]}
      imageAlt={title}
      hover
    >
      <div className="property-card__badges">
        {status && (
          <Badge variant={status === 'for-sale' ? 'success' : 'info'}>
            {status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </Badge>
        )}
        {isNew && <Badge variant="warning">New</Badge>}
        {isFeatured && <Badge variant="primary">Featured</Badge>}
      </div>
      
      <div className="property-card__content">
        <Link to={`/properties/${id}`} className="property-card__title-link">
          <h3 className="property-card__title">{title}</h3>
        </Link>
        
        <p className="property-card__location">📍 {location}</p>
        
        <div className="property-card__price">
          {formatPrice(price)}
        </div>
        
        <div className="property-card__details">
          <span className="property-card__detail">
            🛏️ {bedrooms} Beds
          </span>
          <span className="property-card__detail">
            🚿 {bathrooms} Baths
          </span>
          <span className="property-card__detail">
            📐 {area} m²
          </span>
        </div>
        
        {type && (
          <div className="property-card__type">
            🏠 {type}
          </div>
        )}
      </div>
      
      {showActions && (
        <div className="property-card__actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => onFavorite?.(property)}
            icon={<span>❤️</span>}
          >
            Save
          </Button>
          
          <Button
            variant="primary"
            size="small"
            onClick={() => onContact?.(property)}
          >
            Contact
          </Button>
        </div>
      )}
    </Card>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string,
    status: PropTypes.oneOf(['for-sale', 'for-rent']),
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    area: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    isFeatured: PropTypes.bool,
    isNew: PropTypes.bool,
  }).isRequired,
  onFavorite: PropTypes.func,
  onContact: PropTypes.func,
  showActions: PropTypes.bool,
  className: PropTypes.string,
};

export default PropertyCard;
