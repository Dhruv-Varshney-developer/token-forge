# Token Forge

## Overview
Token Forge is a decentralized application (DApp) that enables users to mint and forge ERC1155 tokens on the Sepolia testnet. Users can mint basic tokens for free (excluding gas costs) and combine them to forge rare tokens through various combinations. The project features an intuitive user interface, sophisticated smart contract architecture, and comprehensive testing coverage.

## Features
- Mint from a collection of 7 unique tokens (IDs 0-6)
- Free minting for base tokens (0-2) with 1-minute cooldown
- Forge rare tokens (3-6) by combining base tokens
- Real-time token balance display
- Automated network switching to Sepolia
- Direct OpenSea integration
- ETH balance display
- Token trading functionality

## Token Mechanics
### Base Tokens (0-2)
- Freely mintable by anyone (gas costs apply)
- 1-minute cooldown between mints
- No maximum supply limit
- Can be traded and used for forging

### Forge-able Tokens (3-6)
- Token 3: Requires burning tokens 0 and 1
- Token 4: Requires burning tokens 1 and 2
- Token 5: Requires burning tokens 0 and 2
- Token 6: Requires burning tokens 0, 1, and 2
- Cannot be used for further forging
- Can be burned without returns

## Technical Stack
### Frontend
- React.js
- Web3.js for blockchain interactions
- MetaMask integration
- Tailwind CSS for styling
- Ethers.js for Ethereum interactions

### Smart Contracts
- Solidity
- ERC1155 standard implementation
- Dual contract architecture:
  - Token Contract: ERC1155 implementation
  - Forge Contract: Forging logic and permissions

### Testing & Quality Assurance
- 100% test coverage (line and branch)
- Comprehensive unit testing suite
- Mutation testing using Sumo
- Static analysis using Slither
- Code style enforcement:
  - Solhint for Solidity linting
  - Prettier for code formatting

### Network
- Deployed on Sepolia Testnet
- Automated network switching
- Gas-optimized transactions

## Security Features
- Time-locked minting
- Secure burning mechanisms
- Permission-based forging
- Vulnerability analysis and fixes
- Protected contract interactions

## Development Practices
- Clean code architecture
- Comprehensive testing strategy
- Security-first approach
- Gas optimization
- Modern development tools integration

## Contract Addresses (Sepolia Testnet)
- ERC1155 Token Contract: `0x3324A8364aa9dc826C5a9B7Cb26279A87000b0c3`
- Forging Contract: `0xdCe92E3F9Bd38776cfaEF9d7B6fA551f274D9323`

## Getting Started
1. Connect your MetaMask wallet
2. Switch to Sepolia testnet (automatic prompt available)
3. Ensure you have Sepolia ETH for gas fees
4. Start minting base tokens
5. Experiment with different forging combinations

## Local Development
```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run tests
npm run test

# Run security analysis
npm run security-check
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under an Attribution License - see the LICENSE file for details.
