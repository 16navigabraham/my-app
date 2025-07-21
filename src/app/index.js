"use client"

import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <div>
      <head>
        <title>AbrahamNAVIG</title>
        <meta name="description" content="Next.js app with Privy wallet connection" />
        <link rel="icon" href="/cat.jpg" />
      </head>

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Welcome to AbrahamNAVIG
        </h1>
        
        <WalletConnect />
      </main>
    </div>
  );
}