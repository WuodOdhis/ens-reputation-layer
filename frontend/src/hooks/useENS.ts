import { useState, useCallback } from 'react';
import { ensService, ENSProfile } from '../services/ens';

export function useENS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ENSProfile | null>(null);

  const resolveENS = useCallback(async (ensName: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await ensService.resolveENS(ensName);
      if (!result) {
        setError('ENS name not found');
        setProfile(null);
        return null;
      }

      setProfile(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resolve ENS name');
      setProfile(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    resolveENS,
    loading,
    error,
    profile
  };
}
