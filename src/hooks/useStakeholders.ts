import { useState, useEffect } from 'react';
import { getActiveStakeholders } from '../lib/services/stakeholderService';
import type { Stakeholder } from '../types';

export function useStakeholders() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchStakeholders() {
      try {
        setLoading(true);
        setError(null);
        const activeStakeholders = await getActiveStakeholders();
        
        if (mounted) {
          setStakeholders(activeStakeholders);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load stakeholders. Please try again later.');
          console.error('Error fetching stakeholders:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchStakeholders();

    return () => {
      mounted = false;
    };
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const activeStakeholders = await getActiveStakeholders();
      setStakeholders(activeStakeholders);
    } catch (err) {
      setError('Failed to load stakeholders. Please try again later.');
      console.error('Error fetching stakeholders:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    stakeholders,
    loading,
    error,
    refetch
  };
}