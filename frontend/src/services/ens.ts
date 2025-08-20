import { ethers } from 'ethers';

// Get the API key from environment variables
const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;
const MAINNET_RPC = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export interface ENSProfile {
  name: string;
  address: string | null;
  avatar: string | null;
}

export class ENSService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    if (!ALCHEMY_API_KEY) {
      throw new Error('Alchemy API key not found. Please set VITE_ALCHEMY_API_KEY in your .env file');
    }
    this.provider = new ethers.JsonRpcProvider(MAINNET_RPC);
  }

  async resolveENS(ensName: string): Promise<ENSProfile | null> {
    try {
      // Validate ENS name format
      if (!ensName.endsWith('.eth')) {
        throw new Error('Invalid ENS name format. Must end with .eth');
      }

      // Resolve the ENS name to an address
      const address = await this.provider.resolveName(ensName);
      if (!address) {
        return null;
      }

      // Get avatar if available
      const resolver = await this.provider.getResolver(ensName);
      const avatar = resolver ? await resolver.getText('avatar') : null;

      return {
        name: ensName,
        address,
        avatar
      };
    } catch (error) {
      console.error('Error resolving ENS:', error);
      return null;
    }
  }

  // Add method to validate connection
  async testConnection(): Promise<boolean> {
    try {
      const network = await this.provider.getNetwork();
      console.log('Connected to network:', network.name);
      return true;
    } catch (error) {
      console.error('Failed to connect to Ethereum network:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const ensService = new ENSService();