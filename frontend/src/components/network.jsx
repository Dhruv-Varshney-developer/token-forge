import { useState, useEffect } from 'react';
import React from 'react';

export default function NetworkChecker() {
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);
  
    useEffect(() => {
      const checkNetwork = async () => {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setIsCorrectNetwork(chainId === '11155111'); // 11155111 is the chainId for Sepolia
        }
      };
      checkNetwork();
    }, []);
  
    const switchToSepolia = async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '11155111' }],
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '11155111',
              chainName: 'Sepolia Testnet',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io/'],
            }],
          });
        }
      }
    };
  
    if (!isCorrectNetwork) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Wrong Network!</strong>
          <span className="block sm:inline"> Please switch to the Polygon network.</span>
          <button onClick={switchToSepolia} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
            Switch to Polygon
          </button>
        </div>
      );
    }
  
    return null;
  }