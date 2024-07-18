import React from 'react';

export default function MintingInterface({ mint }) {
    return (
      <div>
        <h2>Mint Tokens</h2>
        {[0, 1, 2].map(tokenId => (
          <button key={tokenId} onClick={() => mint(tokenId)}>
            Mint Token {tokenId}
          </button>
        ))}
      </div>
    );
  }