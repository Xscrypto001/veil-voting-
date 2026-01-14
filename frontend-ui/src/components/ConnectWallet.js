import { useState } from "react";
import { ethers } from "ethers";

function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setError(null);
      setLoading(true);
      
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to use this feature");
      }

      // Check if already connected
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // Request account access
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect in MetaMask.");
      }
      
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      
      if (onConnect) {
        onConnect(address, provider);
      }
      
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connect-wallet">
      {error && (
        <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      
      {account ? (
        <div className="connected-account">
          <span>Connected: {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: loading ? "#ccc" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;