'use client'
import { useState } from "react";
import { Shield, Vote, Eye, Wallet, Lock, CheckCircle } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";
import CommitVote from "../components/CommitVote";
import Reveal from "../components/RevealVote";
import veilVoteAbi from "../abi/VeilVote.json";

const CONTRACT_ADDRESS = "0xE9b643d567A8Ec775a678012CD2a63BEAeF8F102";

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [activeTab, setActiveTab] = useState("commit");

  return (
    <div className="min-h-screen bg-white gradient-to-br from-gray-900 to-black text-black">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 -to-r from-purple-600 to-blue-600 rounded-2xl">
            </div>
            <h1 className="text-5xl font-bold -to-r from-purple-400 to-blue-400 text-black bg- clip-text text- transparent">
              Veil Vote
            </h1>
          </div>
          <p className="text-black y-400 max-w-2xl mx-auto text-lg">
            A privacy-focused voting dApp that allows you to commit and reveal votes securely on-chain
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Connect Wallet Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">Connect Wallet</h2>
            </div>
            <div className="w-48 w-12 bg- backdrop-blur-sm rounded-2xl  -gray-700 p-4">
              <ConnectWallet 
                onConnect={(address, prov) => setProvider(prov)}
                className="max-w-md mx-auto"
              />
            </div>
          </div>

          {provider && (
            <div className="space-y-12">
              {/* Proposal Info Card */}
              <div className="-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl  -gray-700 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 -to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                    <Vote className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">Proposal #0</h2>
                    <p className="text-black y-400">Governance Token Distribution</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="-800/40 rounded-xl p-4">
                    <p className="text-black y-400 text-sm mb-1">Voting Period</p>
                    <p className="text-lg font-semibold">7 Days</p>
                  </div>
                  <div className="-800/40 rounded-xl p-4">
                    <p className="text-black y-400 text-sm mb-1">Total Votes</p>
                    <p className="text-lg font-semibold">1,234</p>
                  </div>
                  <div className="-800/40 rounded-xl p-4">
                    <p className="text-black y-400 text-sm mb-1">Quorum</p>
                    <p className="text-lg font-semibold">65%</p>
                  </div>
                </div>
                <div className="text-sm text-black y-400">
                  <p>Vote securely with our two-phase commit-reveal system to ensure voter privacy.</p>
                </div>
              </div>

              {/* Voting Interface */}
              <div className="-900/60 backdrop-blur-sm rounded-2xl  -gray-700 overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex -b -gray-800">
                  <button
                    onClick={() => setActiveTab("commit")}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 font-medium transition-all ${
                      activeTab === "commit"
                        ? "-to-r from-purple-600/20 to-blue-600/20 text-purple-400 -b-2 -purple-500"
                        : "text-black y-400 hover:text-white hover:-800/50"
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    Commit Vote
                  </button>
                  <button
                    onClick={() => setActiveTab("reveal")}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 font-medium transition-all ${
                      activeTab === "reveal"
                        ? "-to-r from-purple-600/20 to-blue-600/20 text-purple-400 -b-2 -purple-500"
                        : "text-black y-400 hover:text-white hover:-800/50"
                    }`}
                  >
                    <Eye className="w-5 h-5" />
                    Reveal Vote
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {activeTab === "commit" ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 -to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                          <Lock className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Commit Your Vote</h3>
                          <p className="text-black y-400">Your vote is encrypted and stored securely</p>
                        </div>
                      </div>
                      <CommitVote 
                        provider={provider} 
                        contractAddress={CONTRACT_ADDRESS} 
                        abi={veilVoteAbi} 
                        proposalId={0}
                      />
                      <div className="-800/40 rounded-xl p-4 mt-6">
                        <p className="text-sm text-black y-400">
                          <span className="font-semibold text-purple-400">Note:</span> Your vote is encrypted and cannot be seen by anyone until the reveal phase. You must reveal your vote later for it to count.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 -to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                          <Eye className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">Reveal Your Vote</h3>
                          <p className="text-black y-400">Decrypt and submit your committed vote</p>
                        </div>
                      </div>
                      <Reveal 
                        provider={provider} 
                        contractAddress={CONTRACT_ADDRESS} 
                        abi={veilVoteAbi} 
                        proposalId={0}
                      />
                      <div className="-800/40 rounded-xl p-4 mt-6">
                        <p className="text-sm text-black y-400">
                          <span className="font-semibold text-purple-400">Note:</span> Only reveal votes that you've previously committed. Revealing reveals your choice publicly.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status/Info Panel */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="-800/50 backdrop-blur-sm rounded-2xl  -gray-700 p-6">
                  <h4 className="font-semibold mb-3 text-black y-300">How it works</h4>
                  <ul className="space-y-3 text-sm text-black y-400">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                      <span>1. Commit your encrypted vote</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                      <span>2. Wait for commit phase to end</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5"></div>
                      <span>3. Reveal your vote during reveal phase</span>
                    </li>
                  </ul>
                </div>
                <div className="-800/50 backdrop-blur-sm rounded-2xl  -gray-700 p-6">
                  <h4 className="font-semibold mb-3 text-black y-300">Current Phase</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-lg font-semibold">Commit Phase</span>
                  </div>
                  <div className="w-full -700 rounded-full h-2">
                    <div className="-to-r from-purple-500 to-blue-500 h-2 rounded-full w-2/3"></div>
                  </div>
                  <p className="text-xs text-black y-500 mt-2">4 days 12 hours remaining</p>
                </div>
                <div className="-800/50 backdrop-blur-sm rounded-2xl  -gray-700 p-6">
                  <h4 className="font-semibold mb-3 text-black y-300">Security</h4>
                  <p className="text-sm text-black y-400">
                    Your voting privacy is protected through cryptographic commitments. No one can see your vote until you choose to reveal it.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 -t -gray-800 text-center">
            <p className="text-black y-500 text-sm">
              Built with ❤️ using Veil Protocol • Contract: {CONTRACT_ADDRESS.slice(0, 6)}...{CONTRACT_ADDRESS.slice(-4)}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}