import { useEffect, useState } from 'react';
import { ensService } from '../services/ens';

export function ConnectionStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    async function checkConnection() {
      try {
        const isConnected = await ensService.testConnection();
        setStatus(isConnected ? 'connected' : 'error');
      } catch (error) {
        console.error('Connection test failed:', error);
        setStatus('error');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
        status === 'connected' ? 'bg-green-500/20 text-green-400' :
        status === 'error' ? 'bg-red-500/20 text-red-400' :
        'bg-yellow-500/20 text-yellow-400'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          status === 'connected' ? 'bg-green-400' :
          status === 'error' ? 'bg-red-400' :
          'bg-yellow-400'
        }`} />
        {status === 'connected' ? 'Connected to Ethereum' :
         status === 'error' ? 'Connection Error' :
         'Checking Connection...'}
      </div>
    </div>
  );
}
