import React from 'react';

export default function TokenDisplay({ balances }) {
    return (
      <div>
        <h2>Your Token Balances:</h2>
        {balances.map((balance, index) => (
          <p key={index}>Token {index}: {balance}</p>
        ))}
      </div>
    );
  }

