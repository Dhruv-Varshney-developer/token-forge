import React, { useState } from 'react';
import { balanceOf,mint } from '../utils/contracts';

const MintingInterface = () => {
  const [tokenId, setTokenId] = useState(0);
  const [amount, setAmount] = useState(1);
  const [balance, setBalance] = useState(null);

  const handleMint = async () => {
    const result = await mint(tokenId, amount);
    console.log('Mint result:', result);
  };

  const handleCheckBalance = async () => {
    const result = await balanceOf(tokenId);
    setBalance(result);
  };

  return (
    <div>
      <h2>Mint Tokens</h2>
      <input
        type="number"
        value={tokenId}
        onChange={(e) => setTokenId(Number(e.target.value))}
        placeholder="Token ID"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount"
      />
      <button onClick={handleMint}>Mint Token</button>
      <button onClick={handleCheckBalance}>Check Balance</button>
      {balance !== null && <div>Balance: {balance.toString()}</div>}
    </div>
  );
};

export default MintingInterface;