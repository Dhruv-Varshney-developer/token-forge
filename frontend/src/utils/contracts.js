import { ethers } from 'ethers';
import { Web3Provider } from './web3provider';

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
export const provider = new Web3Provider();

// MetaMask requires requesting permission to connect users accounts
await provider.send("eth_requestAccounts", []);

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
export const signer = provider.getSigner()

export function getERC1155Contract () {
  return new ethers.Contract(ERC1155_ADDRESS, ERC1155_ABI,signer);
}

export function getForgeContract() {
  return new ethers.Contract(FORGING_ADDRESS, FORGING_ABI,signer);
}


const main = async () => {const name = await getERC1155Contract().name;
  console.log(getERC1155Contract());
  console.log(getForgeContract());
console.log(name);
}
main();