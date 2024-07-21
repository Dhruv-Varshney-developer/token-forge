/* eslint-disable react-hooks/rules-of-hooks */
import { useReadContract, useWriteContract, useAccount } from 'wagmi';

const FORGING_ADDRESS = '0x42B702fcaEA2981c9d8DAF66D1F3D4c580c00F71';



const FORGING_ABI = [
  "function forgeToken(uint256[] memory burnIds, uint256[] memory burnAmounts, uint256 mintId)",
];

  // Function to get the balance of a specific token ID


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