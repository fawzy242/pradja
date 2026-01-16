import React from 'react';
import PropTypes from 'prop-types';
import PropertyCard from '../PropertyCard';
import { Spinner } from '../../atoms';

/**
 * PropertyGrid Component (Organism)
 * Grid layout for displaying multiple properties
 */
const PropertyGrid = ({
  properties = [],
  loading = false,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  onFavorite,
  onContact,
  emptyMessage = 'No properties found',
  className = '',
}) => {
  const gridClasses = [
    'property-grid',
    'grid',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (loading) {
    return (
      <div className="property-grid__loading">
        <Spinner size="large" />
        <p>Loading properties...</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="property-grid__empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={gridClasses}>
      {properties.map((property) => (
        <div key={property.id} className="property-grid__item">
          <PropertyCard
            property={property}
            onFavorite={onFavorite}
            onContact={onContact}
          />
        </div>
      ))}
    </div>
  );
};

PropertyGrid.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  columns: PropTypes.shape({
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
  }),
  onFavorite: PropTypes.func,
  onContact: PropTypes.func,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};

export default PropertyGrid;
