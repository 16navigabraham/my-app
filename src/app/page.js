"use client"

import { PrivyProvider } from '@privy-io/react-auth';


export default function App({ Component, pageProps }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        // Customize the Privy appearance
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'cat.jpg', // optional
        },
        // Configure login methods
        loginMethods: ['wallet'],
        // Configure supported chains
        supportedChains: [
          {
            id: 1,
            name: 'Ethereum',
            network: 'homestead',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://eth.drpc.org'],
              },
            },
          },
          {
            id: 8453,
            name: 'Base',
            network: 'homebase',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://base-rpc.publicnode.com'],
              },
            },
          },
        ],
        // Configure embedded wallets
        // embeddedWallets: {
        //   createOnLogin: 'users-without-wallets',
        // },
      }}
    >
      <Component {...pageProps} />
    </PrivyProvider>
  );
}