import { ethers } from 'ethers';

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const MAINNET_RPC = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export interface ENSProfile {
  name: string;
  address: string;
}

class ENSService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    if (!ALCHEMY_API_KEY) {
      throw new Error('Alchemy API key not found. Please set VITE_ALCHEMY_API_KEY in your .env file');
    }
    this.provider = new ethers.JsonRpcProvider(MAINNET_RPC);
  }

  async resolveENS(ensName: string): Promise<ENSProfile | null> {
    try {
      // Basic validation
      if (!ensName.endsWith('.eth')) {
        throw new Error('Invalid ENS name format. Must end with .eth');
      }

      // Simple resolution
      const address = await this.provider.resolveName(ensName);
      if (!address) {
        return null;
      }

      return {
        name: ensName,
        address,
      };
    } catch (error) {
      console.error('Error resolving ENS:', error);
      return null;
    }
  }
}

export const ensService = new ENSService();