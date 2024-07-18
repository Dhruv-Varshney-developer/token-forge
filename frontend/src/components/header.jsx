import React from 'react';
import { useAccount, useBalance } from "wagmi";

import { ConnectKitButton } from "connectkit";
import { Web3Provider } from "/Users/dhruvvarshney/Desktop/metana/metana-bootcamp/module-3/frontend/src/utils/web3provider.jsx";
import { getBalance } from 'viem/actions';
import { formatEther } from 'viem';



export default function Header() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
    watch: true,
  });

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div >
          
          <ConnectKitButton />
        
      </div>
        <div >
          {address && (
            <div>
              Balance: {balanceLoading ? "Loading..." : balance.formatted + " ETH"}
            </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}
