import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ERC1155Token_ABI, ERC1155_ADDRESS } from "../constants/ERC1155";

const BurningInterface = () => {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  

  const { 
    writeContract , error } = useWriteContract();

  const handleBurn = async () => {
    if (tokenId === "" || amount === "") return;

    setIsLoading(true);
    try {
      await writeContract({
        address: ERC1155_ADDRESS,
        abi: ERC1155Token_ABI,
        functionName: "burn",
        args: [address, Number(tokenId), Number(amount)],

        
      });
    } catch (error) {
      console.error('Burning failed:', error);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Burn Tokens</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="tokenId"
            className="block text-sm font-medium text-gray-700"
          >
            Token ID
          </label>
          <input
            id="tokenId"
            type="text"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            placeholder="Enter Token ID to Burn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount to Burn"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={handleBurn}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Burning..." : "Burn Token"}
          </button>
        </div>
        {/* Display error messages below the forge button */}
        {error && (
        <div>Error: {(error).shortMessage || error.message}</div>
      )}
      </div>
      <div className="mt-4 text-center">
        <a
          href="https://testnets.opensea.io/assets/sepolia/0x3324A8364aa9dc826C5a9B7Cb26279A87000b0c3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          View on OpenSea
        </a>
      </div>
    </div>
  );
};

export default BurningInterface;
