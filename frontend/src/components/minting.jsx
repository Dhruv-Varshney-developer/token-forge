import React, { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { ERC1155Token_ABI, ERC1155_ADDRESS } from "../constants/ERC1155";

const MintingInterface = () => {
  const { address } = useAccount();
  const [tokenId, setTokenId] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the useReadContract hook to fetch the balance
  const { data: balanceData, isLoading: isBalanceLoading } = useReadContract({
    address: ERC1155_ADDRESS,
    abi: ERC1155Token_ABI,
    functionName: "balanceOf",
    args: [address, Number(tokenId)],
    watch: true,
  });

  // Use the useContractWrite hook to mint tokens
  const {
    writeContract, isLoading: isMinting, error } = useWriteContract();


  const handleMint = async () => {
    if (tokenId === "" || amount === "") return;

    setIsLoading(true);
    try {
      writeContract({
        address: ERC1155_ADDRESS,
        abi: ERC1155Token_ABI,
        functionName: "mint",
        args: [Number(tokenId), Number(amount)],


      }) // Wait for the transaction to be confirmed

    } catch (error) {
      console.error("Minting failed:", error);
      // Error message is already set in onError callback
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckBalance = () => {
    if (tokenId === "") return;
    setBalance(balanceData); // Update balance from the hook
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Mint Tokens</h2>
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
            placeholder="Enter Token ID"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <button
          onClick={handleCheckBalance}
          disabled={isBalanceLoading}
          className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isBalanceLoading ? "Checking..." : "Check Balance"}
        </button>
        {balance !== null && (
          <div className="text-center font-semibold">
            Balance: {balance ? balance.toString() : "0"}
          </div>
        )}
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
            {isLoading || isMinting ? "Minting..." : "Mint Token"}
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

export default MintingInterface;
