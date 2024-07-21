import React, { useState } from 'react';
import { useReadContract } from 'wagmi';
import { useWriteContract } from 'wagmi';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';

const ERC1155_ADDRESS = '0xc01E9EfA9E40B64908dAE732063e841cD6101C9A';
const ERC1155_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function mint(uint256 id, uint256 amount)",
];

const MintingInterface = () => {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the useContractRead hook to fetch the balance
  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    address: ERC1155_ADDRESS,
    abi: ERC1155_ABI,
    functionName: 'balanceOf',
    args: [address,  Number(tokenId) ],
    watch: true,
  });

  // Use the useContractWrite hook to mint tokens
  const { write: mintToken, isLoading: isMinting } = useWriteContract({
    address: ERC1155_ADDRESS,
    abi: ERC1155_ABI,
    functionName: 'mint',
  });

  const handleMint = async () => {
    if (tokenId === '' || amount === '') return;
    setIsLoading(true);
    try {
      const result = await mintToken({ args: [Number(tokenId), Number(amount)] });
      await result.wait(); // Wait for the transaction to be confirmed
      console.log('Mint result:', result);
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error('Minting failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBalance = () => {
    if (tokenId === '') return;
    setBalance(balanceData); // Update balance from the hook
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Mint Tokens</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenId" className="block text-sm font-medium text-gray-700">Token ID</label>
          <input
            id="tokenId"
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter Token ID"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
            onClick={handleCheckBalance}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isBalanceLoading ? 'Checking...' : 'Check Balance'}
          </button>
          {balance !== null && (
          <div className="text-center font-semibold">
            Balance: {balance ? balance.toString() : '0'}
          </div>
        )}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={handleMint}
            disabled={isLoading || isMinting}
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading || isMinting ? 'Minting...' : 'Mint Token'}
          </button>
          
        </div>
        
      </div>
    </div>
  );
};

export default MintingInterface;