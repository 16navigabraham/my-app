"use client"

import WalletConnect from '../components/WalletConnect.js';

export default function Home() {
  return (
    <div>
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Welcome to AbrahamNAVIG
        </h1>
        
        <WalletConnect />
      </main>
    </div>
  );
}