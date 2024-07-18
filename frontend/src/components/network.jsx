
import React from 'react';

export default function NetworkChecker() {
    const [isCorrectNetwork, setIsCorrectNetwork] = useState(true);
  
    useEffect(() => {
      const checkNetwork = async () => {
        if (window.ethereum) {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setIsCorrectNetwork(chainId === '0x89'); // 0x89 is the chainId for Polygon
        }
      };
      checkNetwork();
    }, []);
  
    const switchToPolygon = async () => {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }],
        });
      } catch (error) {
        // This error code indicates that the chain has not been added to MetaMask
        if (error.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x89',
              chainName: 'Polygon Mainnet',
              nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
              rpcUrls: ['https://polygon-rpc.com/'],
              blockExplorerUrls: ['https://polygonscan.com/'],
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
          <button onClick={switchToPolygon} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
            Switch to Polygon
          </button>
        </div>
      );
    }
  
    return null;
  }