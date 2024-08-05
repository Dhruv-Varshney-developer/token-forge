
import React, { useState } from 'react';
import {  useAccount, useWriteContract } from 'wagmi';
import { FORGING_ADDRESS, forgingABI } from '../constants/forging';


const ForgingInterface = () => {
  const { address } = useAccount();
  const [burnIds, setBurnIds] = useState(["", "", ""]); // Three burn ID fields
  const [burnAmounts, setBurnAmounts] = useState(["", "", ""]); // Corresponding burn amounts
  const [mintId, setMintId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 

   // Use the useContractWrite hook to mint tokens
   const { 
    writeContract , error } = useWriteContract();

  // Function to handle forging
  const handleForge = async () => {
    // Filter out empty burn IDs and corresponding amounts
    const burnIdsNumbers = burnIds.filter((id) => id !== "");
    const burnAmountsNumbers = burnAmounts
      .map(Number)
      .filter((amount, index) => burnIds[index] !== "");

    if (burnIdsNumbers.length === 0 || mintId === "") return;

    setIsLoading(true);
    try {
      await writeContract({
        address: FORGING_ADDRESS,
        abi: forgingABI,
        functionName: "forgeToken",
        args: [burnIdsNumbers, burnAmountsNumbers, Number(mintId)],
        account: address,

        
        
      });
    } catch (e) {
      console.error('Forging failed:', e);
      // Error message is already set in onError callback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Forge Tokens</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="burnIds"
            className="block text-sm font-medium text-gray-700"
          >
            Burn Token IDs
          </label>
          <div className="flex flex-col space-y-2">
            <input
              id="burnId1"
              type="text"
              value={burnIds[0]}
              onChange={(e) =>
                setBurnIds([e.target.value, burnIds[1], burnIds[2]])
              }
              placeholder="Enter Burn Token ID 1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              id="burnId2"
              type="text"
              value={burnIds[1]}
              onChange={(e) =>
                setBurnIds([burnIds[0], e.target.value, burnIds[2]])
              }
              placeholder="Enter Burn Token ID 2 (optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              id="burnId3"
              type="text"
              value={burnIds[2]}
              onChange={(e) =>
                setBurnIds([burnIds[0], burnIds[1], e.target.value])
              }
              placeholder="Enter Burn Token ID 3 (optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="burnAmounts"
            className="block text-sm font-medium text-gray-700"
          >
            Burn Amounts
          </label>
          <div className="flex flex-col space-y-2">
            <input
              id="burnAmount1"
              type="text"
              value={burnAmounts[0]}
              onChange={(e) =>
                setBurnAmounts([e.target.value, burnAmounts[1], burnAmounts[2]])
              }
              placeholder="Enter Burn Amount for ID 1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              id="burnAmount2"
              type="text"
              value={burnAmounts[1]}
              onChange={(e) =>
                setBurnAmounts([burnAmounts[0], e.target.value, burnAmounts[2]])
              }
              placeholder="Enter Burn Amount for ID 2 (optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              id="burnAmount3"
              type="text"
              value={burnAmounts[2]}
              onChange={(e) =>
                setBurnAmounts([burnAmounts[0], burnAmounts[1], e.target.value])
              }
              placeholder="Enter Burn Amount for ID 3 (optional)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="mintId"
            className="block text-sm font-medium text-gray-700"
          >
            Mint Token ID
          </label>
          <input
            id="mintId"
            type="text"
            value={mintId}
            onChange={(e) => setMintId(e.target.value)}
            placeholder="Enter Mint Token ID (3-6)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex space-x-4">
          <button
            onClick={handleForge}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLoading ? "Forging..." : "Forge Token"}
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

export default ForgingInterface;
