import { useState, useEffect } from 'react';
import { propertyService } from '@/services/mock';

/**
 * usePropertyDetail Hook
 * Manages single property detail state
 */
export const usePropertyDetail = (propertyId) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return;

      try {
        setLoading(true);
        setError(null);
        
        const response = await propertyService.getPropertyById(propertyId);

        if (response.success) {
          setProperty(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
};

export default usePropertyDetail;
