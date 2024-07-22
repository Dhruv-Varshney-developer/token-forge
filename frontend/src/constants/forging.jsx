export const FORGING_ADDRESS = '0xdCe92E3F9Bd38776cfaEF9d7B6fA551f274D9323';



export const forgingABI = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_tokenContract', type: 'address' }
    ]
  },
  {
    type: 'function',
    name: 'forgeToken',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'burnIds', type: 'uint256[]' },
      { name: 'burnAmounts', type: 'uint256[]' },
      { name: 'mintId', type: 'uint256' }
    ],
    outputs: []
  },
  {
    type: 'function',
    name: 'isValidForge',
    stateMutability: 'pure',
    inputs: [
      { name: 'burnIds', type: 'uint256[]' },
      { name: 'mintId', type: 'uint256' }
    ],
    outputs: [
      { type: 'bool' }
    ]
  }
];