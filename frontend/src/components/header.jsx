import { useWeb3Modal } from '@web3modal/ethers/react';
import React from 'react';

export default function Header() {
  const { open } = useWeb3Modal();
  return (
    <header>
      <button onClick={() => open()}>Connect Wallet</button>
    </header>
  );
}