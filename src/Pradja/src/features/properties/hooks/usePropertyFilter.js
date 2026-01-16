import { useState, useCallback } from 'react';

/**
 * usePropertyFilter Hook
 * Manages property filter state
 */
export const usePropertyFilter = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
    ...initialFilters,
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const getActiveFiltersCount = useCallback(() => {
    return Object.values(filters).filter(v => v !== '' && v !== null && v !== undefined).length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    activeFiltersCount: getActiveFiltersCount(),
  };
};

export default usePropertyFilter;
