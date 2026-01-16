import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormField } from '../../molecules';
import { Button } from '../../atoms';

/**
 * PropertyFilter Component (Organism)
 * Filter controls for property listings
 */
const PropertyFilter = ({
  onFilter,
  onReset,
  className = '',
}) => {
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter?.(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
    };
    setFilters(resetFilters);
    onReset?.(resetFilters);
  };

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'land', label: 'Land' },
  ];

  const statusOptions = [
    { value: 'for-sale', label: 'For Sale' },
    { value: 'for-rent', label: 'For Rent' },
  ];

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
  ];

  return (
    <form className={`property-filter ${className}`} onSubmit={handleSubmit}>
      <div className="property-filter__fields">
        <FormField
          type="text"
          label="Location"
          placeholder="City, area, or address"
          value={filters.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
        
        <FormField
          type="select"
          label="Property Type"
          options={propertyTypes}
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
        />
        
        <FormField
          type="select"
          label="Status"
          options={statusOptions}
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        />
        
        <FormField
          type="number"
          label="Min Price (IDR)"
          placeholder="0"
          value={filters.minPrice}
          onChange={(e) => handleChange('minPrice', e.target.value)}
        />
        
        <FormField
          type="number"
          label="Max Price (IDR)"
          placeholder="1000000000"
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
        />
        
        <FormField
          type="select"
          label="Bedrooms"
          options={bedroomOptions}
          value={filters.bedrooms}
          onChange={(e) => handleChange('bedrooms', e.target.value)}
        />
      </div>
      
      <div className="property-filter__actions">
        <Button type="submit" variant="primary">
          Apply Filters
        </Button>
        
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
};

PropertyFilter.propTypes = {
  onFilter: PropTypes.func,
  onReset: PropTypes.func,
  className: PropTypes.string,
};

export default PropertyFilter;
