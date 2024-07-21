/* eslint-disable react-hooks/rules-of-hooks */
import { useReadContract, useWriteContract, useAccount } from 'wagmi';

const ERC1155_ADDRESS = '0xc01E9EfA9E40B64908dAE732063e841cD6101C9A';
const FORGING_ADDRESS = '0x42B702fcaEA2981c9d8DAF66D1F3D4c580c00F71';

const ERC1155_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function mint(uint256 id, uint256 amount)",
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)",
];

const FORGING_ABI = [
  "function forgeToken(uint256[] memory burnIds, uint256[] memory burnAmounts, uint256 mintId)",
];

  // Function to get the balance of a specific token ID
  export const balanceOf = async (id) => {
    const { address } = useAccount();

    const { data, error } = await useReadContract({
      address: ERC1155_ADDRESS,
      abi: ERC1155_ABI,
      functionName: 'balanceOf',
      args: [address, id],
      watch: true,
    });

    if (error) {
      console.error("Error fetching balance:", error);
      return null; // or handle error as needed
    }
    return data; // Return the balance
  };

  // Function to mint a specific token
  export const mint = async (id, amount) => {
    const { data, error } = await useWriteContract({
      address: ERC1155_ADDRESS,
      abi: ERC1155_ABI,
      functionName: 'mint',
      args: [id, amount], // Pass the token ID and amount
    });

    if (error) {
      console.error("Error minting token:", error);
      return null; // or handle error as needed
    }

    // Optionally wait for the transaction to be confirmed
    await data.wait(); // Ensure to handle this properly in your UI
    return data; // Return transaction data or any other relevant info
  };



  const forgeToken = async (burnIds,burnAmounts, mintId) => {
  const { address } = useAccount();
 const{data:hash, writeContract}=await useWriteContract({
    address: FORGING_ADDRESS,
    abi: FORGING_ABI,
    functionName: 'forgeToken',
    args: [burnIds, burnAmounts, mintId],
  });

  return writeContract;
}