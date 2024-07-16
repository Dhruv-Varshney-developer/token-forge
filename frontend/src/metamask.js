// src/metamask.js
import { ethers } from 'ethers';

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            return accounts[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    } else {
        console.error('Metamask not installed');
        return null;
    }
};

export const getProvider = () => {
    if (window.ethereum) {
        return new ethers.providers.Web3Provider(window.ethereum);
    } else {
        console.error('Metamask not installed');
        return null;
    }
};

export const switchNetwork = async (chainId) => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        } catch (error) {
            console.error(error);
        }
    }
};
