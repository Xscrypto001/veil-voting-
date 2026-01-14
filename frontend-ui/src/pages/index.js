'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConnectWallet from '../components/ConnectWallet';

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-24">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                VeilVote
              </span>
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="#how" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                How it Works
              </Link>
              <Link href="#why" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                Why ZK
              </Link>
              <ConnectWallet onConnect={(address, provider) => {
                console.log('Connected:', address);
              }} />
            </div>
          </nav>

          {/* Main Hero */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Vote.
                <span className="block text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                  Your Secret.
                </span>
                Always Protected.
              </h1>
              
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                VeilVote revolutionizes digital voting with zero-knowledge proofs, 
                ensuring your choices remain private while proving your vote was counted correctly. 
                No compromises. No transparency.
              </p>
              
              <div className="flex space-x-6">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Voting Now
                </button>
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-all flex items-center space-x-2"
                >
                  <span>▶</span>
                  <span>See How It Works</span>
                </button>
              </div>
            </div>

            {/* Interactive Demo Visualization */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-500">Your Vote</div>
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Encrypted
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 mb-4">Cast Your Ballot</div>
                    <div className="space-y-3">
                      {['Yes', 'No', 'Abstain'].map((option, i) => (
                        <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                {i + 1}
                              </div>
                              <span className="font-medium">{option}</span>
                            </div>
                            <div className="text-xs text-gray-500">Select →</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    Your selection is transformed into a zero-knowledge proof
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="animate-pulse">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">ZK</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Magic of Zero-Knowledge Voting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prove your vote was counted without revealing who you voted for
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Cast Encrypted Vote',
                desc: 'Your vote is encrypted on-chain using advanced cryptography. Only you hold the key to decrypt it.',
                icon: '🔒'
              },
              {
                step: '02',
                title: 'Generate ZK Proof',
                desc: 'Create a mathematical proof that verifies your vote is valid without exposing your choice.',
                icon: '📊'
              },
              {
                step: '03',
                title: 'Verify & Count',
                desc: 'The network verifies your proof and counts your vote anonymously. Results are tamper-proof.',
                icon: '✅'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="text-5xl font-bold text-gray-200">{item.step}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ZK */}
      <section id="why" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Why Zero-Knowledge Beats<br />
                <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
                  Traditional Voting
                </span>
              </h2>
              
              <div className="space-y-8">
                {[
                  {
                    title: 'Complete Privacy',
                    desc: 'No one can see your vote—not even the voting platform. True secret ballot achieved.',
                    color: 'from-purple-500 to-purple-600'
                  },
                  {
                    title: 'Mathematical Certainty',
                    desc: 'Every vote is provably counted and valid, eliminating doubt about election integrity.',
                    color: 'from-blue-500 to-blue-600'
                  },
                  {
                    title: 'Resistance to Coercion',
                    desc: 'Cannot prove who you voted for, protecting you from pressure and influence.',
                    color: 'from-green-500 to-green-600'
                  },
                  {
                    title: 'Transparent Counting',
                    desc: 'While votes are private, the counting process is fully transparent and verifiable.',
                    color: 'from-cyan-500 to-cyan-600'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className={`w-3 h-3 mt-2 rounded-full bg-gradient-to-r ${item.color}`}></div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                VeilVote vs Traditional Methods
              </h3>
              
              <div className="space-y-6">
                {[
                  { feature: 'Vote Privacy', veilVote: '✓ Complete', traditional: '✗ Limited' },
                  { feature: 'Verifiable Results', veilVote: '✓ Mathematical Proof', traditional: '✓ Manual Audit' },
                  { feature: 'Coercion Resistance', veilVote: '✓ Built-in', traditional: '✗ Vulnerable' },
                  { feature: 'Digital Convenience', veilVote: '✓ Instant', traditional: '✗ Physical Required' },
                  { feature: 'Transparent Process', veilVote: '✓ Full Transparency', traditional: '✗ Opaque' }
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg">
                    <div className="font-medium text-gray-900">{row.feature}</div>
                    <div className="text-green-600 font-semibold text-center">{row.veilVote}</div>
                    <div className="text-red-600 font-semibold text-center">{row.traditional}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Where VeilVote Shines Brightest
            </h2>
            <p className="text-xl text-gray-600">
              Empowering communities and organizations with secure voting
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🏛️',
                title: 'DAO Governance',
                desc: 'Transparent yet private voting for decentralized organizations'
              },
              {
                icon: '🏢',
                title: 'Corporate Decisions',
                desc: 'Anonymous shareholder and board voting'
              },
              {
                icon: '🎓',
                title: 'Academic Elections',
                desc: 'Secure student government and faculty voting'
              },
              {
                icon: '🌍',
                title: 'Community Polls',
                desc: 'Public opinion research without privacy concerns'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg- gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-4xl text-black font-bold mb-6">
              Ready to Vote with Confidence?
            </h2>
            <p className="text-xl mb-10 text-black  opacity-90">
              Join the future of private, verifiable digital voting
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="px-10 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                Create Your First Poll
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                Read Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">VeilVote</span>
            </div>
            
            <div className="text-gray-600">
              <p className="text-center md:text-right">
                Built with ❤️ for a more private digital world
              </p>
              <p className="text-sm text-center md:text-right mt-2">
                © {new Date().getFullYear()} VeilVote. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">How VeilVote Works</h3>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="text-3xl hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-xl text-gray-600">Video explanation coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}