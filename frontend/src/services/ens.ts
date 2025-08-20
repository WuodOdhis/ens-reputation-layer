import { ethers } from 'ethers';

const MAINNET_RPC = 'https://eth-mainnet.g.alchemy.com/v2/your-api-key'; // We'll need to move this to env

export interface ENSProfile {
  name: string;
  address: string | null;
  avatar: string | null;
}

export class ENSService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(MAINNET_RPC);
  }

  async resolveENS(ensName: string): Promise<ENSProfile | null> {
    try {
      // Validate ENS name format
      if (!ensName.endsWith('.eth')) {
        throw new Error('Invalid ENS name format');
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
}

// Create a singleton instance
export const ensService = new ENSService();
