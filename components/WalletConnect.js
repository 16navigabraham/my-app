import { usePrivy } from '@privy-io/react-auth';

export default function WalletConnect() {
  const { 
    ready, 
    authenticated, 
    user, 
    login, 
    logout, 
    linkWallet, 
    unlinkWallet 
  } = usePrivy();

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {authenticated ? (
        <div>
          <h3>Welcome!</h3>
          <div style={{ marginBottom: '20px' }}>
            {user.wallet && (
              <p>
                <strong>Wallet:</strong> {user.wallet.address}
              </p>
            )}
            {user.email && (
              <p>
                <strong>Email:</strong> {user.email.address}
              </p>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={logout}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
            
            {!user.wallet && (
              <button 
                onClick={linkWallet}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#676FFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Link Wallet
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>Connect Your Wallet</h3>
          <button 
            onClick={login}
            style={{
              padding: '15px 30px',
              backgroundColor: '#676FFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
}