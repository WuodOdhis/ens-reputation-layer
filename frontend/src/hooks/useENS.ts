import { useState } from 'react';
import { ensService, ENSProfile } from '../services/ens';

export function useENS() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveENS = async (ensName: string): Promise<ENSProfile | null> => {
    try {
      setLoading(true);
      setError(null);
      return await ensService.resolveENS(ensName);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to resolve ENS name';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    resolveENS,
    loading,
    error
  };
}