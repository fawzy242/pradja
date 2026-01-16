import { useState, useEffect } from 'react';
import { agentService } from '@/services/mock';

export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await agentService.getAllAgents();
        if (response.success) {
          setAgents(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  return { agents, loading, error };
};

export default useAgents;
