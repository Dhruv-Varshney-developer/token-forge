import { ethers } from 'ethers';

export const ERC1155_ADDRESS = '0xc01E9EfA9E40B64908dAE732063e841cD6101C9A';
export const FORGING_ADDRESS = '0x30C086F31467C51FEe30441e8d89829edf27d5A4';

export const ERC1155_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function mint(uint256 id, uint256 amount)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)",
];

export const FORGING_ABI = [
  "function forgeToken(uint256[] memory burnIds, uint256[] memory burnAmounts, uint256 mintId)",
];

export function getERC1155Contract(signer) {
  return new ethers.Contract(ERC1155_ADDRESS, ERC1155_ABI, signer);
}

export function getForgeContract(signer) {
  return new ethers.Contract(FORGING_ADDRESS, FORGING_ABI, signer);
}