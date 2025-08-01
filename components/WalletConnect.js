"use client"

import { useState, useEffect } from 'react';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider } from 'ethers';

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://eth.drpc.org'
};

const base = {
  chainId: 8453,
  name: 'Base',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://base-rpc.publicnode.com'
};

// 3. Create a metadata object
const metadata = {
  name: 'AbrahamNAVIG',
  description: 'Web3 wallet connection for AbrahamNAVIG',
  url: 'https://your-domain.com', // origin must match your domain & subdomain
  icons: ['/cat.jpg']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, base],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

export default function WalletConnect() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [balance, setBalance] = useState('');

  const getBalance = async () => {
    if (!walletProvider || !address) return;
    
    try {
      const ethersProvider = new BrowserProvider(walletProvider);
      const balance = await ethersProvider.getBalance(address);
      const balanceInEth = parseFloat(balance) / Math.pow(10, 18);
      setBalance(balanceInEth.toFixed(4));
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      getBalance();
    }
  }, [isConnected, address, chainId]);

  const getChainName = (chainId) => {
    switch (chainId) {
      case 1:
        return 'Ethereum';
      case 8453:
        return 'Base';
      default:
        return 'Unknown Chain';
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      {!isConnected ? (
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            Connect Your Wallet
          </h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            Connect your wallet to get started with AbrahamNAVIG
          </p>
          <w3m-button />
        </div>
      ) : (
        <div>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            Wallet Connected
          </h2>
          <div style={{ 
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <strong>Address:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <strong>Chain:</strong> {getChainName(chainId)}
            </p>
            <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
              <strong>Balance:</strong> {balance} ETH
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <w3m-button />
            <button 
              onClick={getBalance}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#676FFF',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Refresh Balance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}