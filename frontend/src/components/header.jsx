import React from 'react';
import { useAccount, useBalance } from "wagmi";

import { ConnectKitButton } from "connectkit";




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
            <div className="balance-display">
            <span>Balance:</span>
            {balanceLoading ? "Loading..." : balance.formatted + " ETH"}
          </div>
          )}
        </div>
        
      </div>
    </nav>
  );
}

