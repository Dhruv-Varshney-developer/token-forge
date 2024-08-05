import React, { useState } from 'react';
import {   useWriteContract } from 'wagmi';
import { ERC1155Token_ABI, ERC1155_ADDRESS } from '../constants/ERC1155';

const TradingInterface = () => {
  
  const [giveTokenId, setGiveTokenId] = useState('');
  const [giveAmount, setGiveAmount] = useState('');
  const [receiveTokenId, setReceiveTokenId] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const {
    writeContract, error } = useWriteContract();
  const handleTrade = async () => {
    if (giveTokenId === '' || giveAmount === '' || receiveTokenId === '') return;

    setIsLoading(true);
    try {
      await writeContract({
        address: ERC1155_ADDRESS,
        abi: ERC1155Token_ABI,
        functionName: 'tradeToken',
        args: [Number(giveTokenId), Number(giveAmount), Number(receiveTokenId)],

      });
    } catch (e) {
      console.error('Trading failed:', e);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Trade Tokens</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="giveTokenId" className="block text-sm font-medium text-gray-700">Give Token ID</label>
          <input
            id="giveTokenId"
            type="text"
            value={giveTokenId}
            onChange={(e) => setGiveTokenId(e.target.value)}
            placeholder="Enter Token ID to Give"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="giveAmount" className="block text-sm font-medium text-gray-700">Give Amount</label>
          <input
            id="giveAmount"
            type="text"
            value={giveAmount}
            onChange={(e) => setGiveAmount(e.target.value)}
            placeholder="Enter Amount to Give"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="receiveTokenId" className="block text-sm font-medium text-gray-700">Receive Token ID</label>
          <input
            id="receiveTokenId"
            type="text"
            value={receiveTokenId}
            onChange={(e) => setReceiveTokenId(e.target.value)}
            placeholder="Enter Token ID to Receive"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={handleTrade}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? 'Trading...' : 'Trade Token'}
          </button>
        </div>
        {/* Display error messages below the forge button */}
        {error && (
          <div>Error: {(error).shortMessage || error.message}</div>
        )}
      </div>
      <div className="mt-4 text-center">
        <a href="https://testnets.opensea.io/assets/sepolia/0x3324A8364aa9dc826C5a9B7Cb26279A87000b0c3" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
          View on OpenSea
        </a>
      </div>
    </div>
  );
};

export default TradingInterface;