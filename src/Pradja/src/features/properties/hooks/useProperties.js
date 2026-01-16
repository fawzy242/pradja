import { useState, useEffect, useCallback } from 'react';
import { propertyService } from '@/services/mock';

/**
 * useProperties Hook
 * Manages property list state and operations
 */
export const useProperties = (initialFilters = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
  });

  // Fetch properties
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await propertyService.getAllProperties({
        ...filters,
        page: pagination.page,
        limit: pagination.limit,
      });

      if (response.success) {
        setProperties(response.data.properties);
        setPagination(prev => ({
          ...prev,
          total: response.data.total,
        }));
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.limit]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  // Change page
  const changePage = useCallback((page) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, [initialFilters]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    changePage,
    resetFilters,
    refetch: fetchProperties,
  };
};

export default useProperties;
