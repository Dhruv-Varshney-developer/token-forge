// src/App.js
import React, { useState, useEffect } from 'react';
import { connectWallet, getProvider, switchNetwork } from './metamask';
import { getTokenContract, getForgeContract } from './contracts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [forgeContract, setForgeContract] = useState(null);
    const [tokens, setTokens] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
    const [matic, setMatic] = useState(0);

    useEffect(() => {
        const init = async () => {
            const userAccount = await connectWallet();
            setAccount(userAccount);
            const web3Provider = getProvider();
            setProvider(web3Provider);
            setTokenContract(getTokenContract(web3Provider));
            setForgeContract(getForgeContract(web3Provider));
        };
        init();
    }, []);

    useEffect(() => {
        if (provider && account) {
            provider.getBalance(account).then(balance => {
                setMatic(ethers.utils.formatEther(balance));
            });
        }
    }, [provider, account]);

    const getTokenBalance = async () => {
        if (tokenContract && account) {
            const balances = {};
            for (let i = 0; i <= 6; i++) {
                balances[i] = (await tokenContract.balanceOf(account, i)).toString();
            }
            setTokens(balances);
        }
    };

    const mintToken = async (id) => {
        if (tokenContract) {
            await tokenContract.mint(id, 1);
            getTokenBalance();
        }
    };

    const forgeToken = async (burnIds, burnAmounts, mintId) => {
        if (forgeContract) {
            await forgeContract.forgeToken(burnIds, burnAmounts, mintId);
            getTokenBalance();
        }
    };

    return (
        <div className="container">
            <h1>ERC1155 Token Forge</h1>
            <p>Account: {account}</p>
            <p>MATIC Balance: {matic}</p>
            <button onClick={() => mintToken(0)}>Mint Token 0</button>
            <button onClick={() => mintToken(1)}>Mint Token 1</button>
            <button onClick={() => mintToken(2)}>Mint Token 2</button>
            <button onClick={() => forgeToken([0, 1], [1, 1], 3)}>Forge Token 3</button>
            <button onClick={() => forgeToken([1, 2], [1, 1], 4)}>Forge Token 4</button>
            <button onClick={() => forgeToken([0, 2], [1, 1], 5)}>Forge Token 5</button>
            <button onClick={() => forgeToken([0, 1, 2], [1, 1, 1], 6)}>Forge Token 6</button>
            <button onClick={getTokenBalance}>Get Token Balances</button>
            <div>
                <h3>Token Balances</h3>
                <ul>
                    {Object.keys(tokens).map(id => (
                        <li key={id}>Token {id}: {tokens[id]}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
