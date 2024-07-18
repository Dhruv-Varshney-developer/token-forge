import React from 'react';

export default function ForgingInterface({ forge }) {
    const forgeOptions = [
      { result: 3, required: [0, 1] },
      { result: 4, required: [1, 2] },
      { result: 5, required: [0, 2] },
      { result: 6, required: [0, 1, 2] }
    ];
  
    return (
      <div>
        <h2>Forge Tokens</h2>
        {forgeOptions.map(option => (
          <button key={option.result} onClick={() => forge(option.required, option.result)}>
            Forge Token {option.result}
          </button>
        ))}
      </div>
    );
  }