import React from 'react';
import { ConnectKitButton } from "connectkit";
import { Web3Provider } from "/Users/dhruvvarshney/Desktop/metana/metana-bootcamp/module-3/frontend/src/utils/web3provider.jsx";



export default function Header() {
  return (
    <nav className="navbar">
            <div className="navbar-container">

    <Web3Provider>
      <ConnectKitButton />
    </Web3Provider>
    </div>

    </nav>
  );
}