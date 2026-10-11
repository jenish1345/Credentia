import { createPublicClient, http, type Address, type Hex } from 'viem';
import { monadTestnet } from '@/lib/wagmi';
import { REGISTRY_ADDRESS } from '@/lib/chain';
import type { OnChainCredential } from './credential';
import { ZERO_ADDRESS } from './credential';

/** The subset of CredentialRegistry this app calls. */
export const registryAbi = [
  {
    type: 'function',
    name: 'issueCredential',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'holder', type: 'address' },
      { name: 'credentialType', type: 'bytes32' },
      { name: 'dataHash', type: 'bytes32' },
      { name: 'expiryTimestamp', type: 'uint256' },
    ],
    outputs: [{ name: 'id', type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'getCredential',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'bytes32' }],
    outputs: [
      {
        name: 'credential',
        type: 'tuple',
        components: [
          { name: 'issuer', type: 'address' },
          { name: 'holder', type: 'address' },
          { name: 'credentialType', type: 'bytes32' },
          { name: 'dataHash', type: 'bytes32' },
          { name: 'issuedAt', type: 'uint64' },
          { name: 'expiryTimestamp', type: 'uint64' },
          { name: 'revoked', type: 'bool' },
        ],
      },
    ],
  },
  {
    type: 'function',
    name: 'isAuthorizedIssuer',
    stateMutability: 'view',
    inputs: [{ name: 'issuer', type: 'address' }],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export const registryAddress = (REGISTRY_ADDRESS || undefined) as Address | undefined;
/** True when a registry address is configured. Without it the app runs in clearly labelled demo mode. */
export const isAnchoringEnabled = Boolean(registryAddress);

let client: ReturnType<typeof createPublicClient> | null = null;
function publicClient() {
  client ??= createPublicClient({ chain: monadTestnet, transport: http(monadTestnet.rpcUrls.default.http[0]) });
  return client;
}

/** null = the registry has no such credential. Throws if the registry cannot be read. */
export async function readCredential(id: Hex): Promise<OnChainCredential | null> {
  if (!registryAddress) throw new Error('registry not configured');
  const c = (await publicClient().readContract({ address: registryAddress, abi: registryAbi, functionName: 'getCredential', args: [id] })) as {
    issuer: Address; holder: Address; credentialType: Hex; dataHash: Hex; issuedAt: bigint; expiryTimestamp: bigint; revoked: boolean;
  };
  if (c.issuer === ZERO_ADDRESS) return null;
  return {
    issuer: c.issuer,
    holder: c.holder,
    credentialType: c.credentialType,
    dataHash: c.dataHash,
    issuedAt: Number(c.issuedAt),
    expiryTimestamp: Number(c.expiryTimestamp),
    revoked: c.revoked,
  };
}
