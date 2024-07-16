// src/contracts.js
import { ethers } from 'ethers';
import MyERC1155Token from './MyERC1155Token.json';
import TokenForge from './TokenForge.json';

const tokenAddress = 'YOUR_ERC1155_CONTRACT_ADDRESS';
const forgeAddress = 'YOUR_FORGE_CONTRACT_ADDRESS';

export const getTokenContract = (provider) => {
    return new ethers.Contract(tokenAddress, MyERC1155Token.abi, provider.getSigner());
};

export const getForgeContract = (provider) => {
    return new ethers.Contract(forgeAddress, TokenForge.abi, provider.getSigner());
};
