"use client"

import WalletConnect from '../components/WalletConnect';

export default function Home() {
  return (
    <div>
      <head>
        <title>My App with Privy</title>
        <meta name="description" content="Next.js app with Privy wallet connection" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Welcome to My App
        </h1>
        
        <WalletConnect />
      </main>
    </div>
  );
}