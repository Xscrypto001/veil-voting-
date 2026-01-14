'use client';

import { useState, useEffect } from "react";
import { ethers } from "ethers";

function ConnectWallet({ onConnect }) {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const connectWallet = async () => {
    try {
      setError(null);
      setLoading(true);
      
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error("Please install MetaMask to use this feature");
      }

      // ETHERJS V6 SYNTAX - Use ethers.BrowserProvider instead of ethers.providers.Web3Provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access - Note: In v6, use request() instead of send()
      const accounts = await provider.send("eth_requestAccounts", []);
      
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect in MetaMask.");
      }
      
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      
      setAccount(address);
      
      if (onConnect) {
        onConnect(address, provider);
      }
      
    } catch (err) {
      console.error("Wallet connection error:", err);
      setError(err.message || "Failed to connect wallet");
      
      // Handle specific error codes
      if (err.code === 4001) {
        setError("Connection rejected. Please approve in MetaMask.");
      } else if (err.code === -32002) {
        setError("Request already pending. Please check MetaMask.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <button 
        className="px-6 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
        disabled
      >
        Loading...
      </button>
    );
  }

  return (
    <div className="connect-wallet">
      {error && (
        <div className="text-red-600 text-sm mb-2 p-2 bg-red-50 rounded">
          ⚠️ {error}
        </div>
      )}
      
      {account ? (
        <div className="px-4 py-2 bg-green-600 gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
          <div className="font-mono font-medium">
            {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
          </div>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            loading 
              ? 'bg-blue-600 cursor-not-allowed' 
              : 'bg-blue-700 gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg'
          } text-white`}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;