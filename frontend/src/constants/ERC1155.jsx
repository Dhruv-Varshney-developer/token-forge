
export const ERC1155_ADDRESS = '0x3324A8364aa9dc826C5a9B7Cb26279A87000b0c3';



export const ERC1155Token_ABI = [
    {
      type: 'function',
      name: 'mint',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'id', type: 'uint256' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: []
    },
    {
      type: 'function',
      name: 'forgeMint',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'to', type: 'address' },
        { name: 'id', type: 'uint256' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: []
    },
    {
      type: 'function',
      name: 'burn',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'from', type: 'address' },
        { name: 'id', type: 'uint256' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: []
    },
    {
      type: 'function',
      name: 'uri',
      stateMutability: 'view',
      inputs: [
        { name: 'id', type: 'uint256' }
      ],
      outputs: [
        { type: 'string' }
      ]
    },
    {
      type: 'function',
      name: 'lastMintTime',
      stateMutability: 'view',
      inputs: [
        { name: 'account', type: 'address' },
        { name: 'id', type: 'uint256' }
      ],
      outputs: [
        { type: 'uint256' }
      ]
    },
    {
      type: 'function',
      name: 'balanceOf',
      stateMutability: 'view',
      inputs: [
        { name: 'account', type: 'address' },
        { name: 'id', type: 'uint256' }
      ],
      outputs: [
        { type: 'uint256' }
      ]
    },
    {
      type: 'function',
      name: 'balanceOfBatch',
      stateMutability: 'view',
      inputs: [
        { name: 'accounts', type: 'address[]' },
        { name: 'ids', type: 'uint256[]' }
      ],
      outputs: [
        { type: 'uint256[]' }
      ]
    },
    {
      type: 'function',
      name: 'isApprovedForAll',
      stateMutability: 'view',
      inputs: [
        { name: 'account', type: 'address' },
        { name: 'operator', type: 'address' }
      ],
      outputs: [
        { type: 'bool' }
      ]
    },
    {
      type: 'function',
      name: 'setApprovalForAll',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'operator', type: 'address' },
        { name: 'approved', type: 'bool' }
      ],
      outputs: []
    },
    {
      type: 'function',
      name: 'supportsInterface',
      stateMutability: 'view',
      inputs: [
        { name: 'interfaceId', type: 'bytes4' }
      ],
      outputs: [
        { type: 'bool' }
      ]
    },
    {
      type: 'function',
      name: 'tradeToken',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'giveTokenId', type: 'uint256' },
        { name: 'giveAmount', type: 'uint256' },
        { name: 'receiveTokenId', type: 'uint256' }
      ],
      outputs: []
    },
  ];