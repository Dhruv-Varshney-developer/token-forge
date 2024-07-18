import { useWeb3Modal } from '@web3modal/ethers5/react';
import React from 'react';
import { ConnectKitButton } from "connectkit";
import { Web3Provider } from "/Users/dhruvvarshney/Desktop/metana/metana-bootcamp/module-3/frontend/src/utils/web3provider.tsx";



export default function Header() {
  const { open } = useWeb3Modal();
  return (
    <header>
            <Web3Provider>
      <ConnectKitButton />
    </Web3Provider>
      <w3m-button onClick={() => open()}>Connect Wallet</w3m-button>
    </header>
  );
}