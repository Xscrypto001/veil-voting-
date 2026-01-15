Here’s a **clean, professional README.md** you can drop straight into both repos (you can slightly adapt names if you want separate READMEs). No emojis, written for hackathons, grants, and serious reviewers.

---

# Veil Vote

Veil Vote is a privacy-preserving, on-chain voting system designed for decentralized governance, DAOs, and community decision-making. It enables users to vote without revealing their choices during the voting phase, while still guaranteeing verifiable and tamper-proof results on-chain.

The system is built around cryptographic commitments and a commit–reveal mechanism, with the architecture designed to evolve toward full zero-knowledge voting.

---

## Overview

Traditional on-chain voting exposes voter choices publicly, enabling bribery, coercion, and strategic manipulation. Veil Vote solves this by separating voting into two phases:

1. **Commit phase** – voters submit cryptographic commitments to their votes.
2. **Reveal phase** – voters reveal their vote and secret, which is verified against the original commitment.

Votes remain private until the reveal phase, while all logic is enforced by smart contracts.

---

## Architecture

### Smart Contracts (Arbitrum Sepolia)

* Written in Solidity
* Deployed on Arbitrum Sepolia for low-cost, fast execution
* Core features:

  * Proposal creation
  * Commit voting with hashed commitments
  * Reveal voting with on-chain verification
  * Vote tallying and finalization

### Frontend (Next.js)

* Built with Next.js (App Router)
* Uses ethers.js for blockchain interaction
* Wallet connection via MetaMask
* Allows users to:

  * Connect wallet
  * Commit votes
  * Reveal votes
  * View voting status

---

## Cryptographic Design

Each vote commitment is generated as:

```
keccak256(
  abi.encodePacked(
    proposalId,
    vote,
    secret,
    voterAddress
  )
)
```

This ensures:

* Votes cannot be guessed or brute-forced
* Each commitment is bound to a specific voter
* Votes cannot be replayed or reused

The system is designed to later integrate full zero-knowledge proofs (zk-SNARKs) to remove the need for revealing votes entirely.

---

## Repository Structure

### Smart Contracts (`base_smartcontracts/`)

```
contracts/
  └── VeilVote.sol
scripts/
  └── deploy.js
hardhat.config.cjs
package.json
```

### Frontend (`frontend-ui/`)

```
src/app/
  ├── page.js
  ├── components/
  │   ├── ConnectWallet.js
  │   ├── CommitVote.js
  │   └── RevealVote.js
  ├── utils/
  │   └── veilVote.js
  └── abi/
      └── VeilVote.json
```

---

## Getting Started

### Prerequisites

* Node.js >= 18
* MetaMask
* Arbitrum Sepolia ETH

---

## Smart Contract Setup

### Install dependencies

```bash
cd base_smartcontracts
npm install
```

### Compile contracts

```bash
npx hardhat compile
```

### Deploy to Arbitrum Sepolia

```bash
npx hardhat run scripts/deploy.js --network base
```

After deployment, copy the deployed contract address for the frontend.

---

## Frontend Setup

### Install dependencies

```bash
cd frontend-ui
npm install
```

### Configure contract address

Update in `src/app/page.js`:

```js
const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
```

### Run development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## Usage Flow

1. Connect wallet
2. Create or select a proposal
3. Commit vote (store your secret securely)
4. Wait for commit phase to end
5. Reveal vote using the same secret
6. View finalized results

---

## Current Status

* Commit–reveal voting fully implemented
* Contracts deployed and tested on Arbitrum Sepolia
* Functional frontend with wallet integration

---

## Future Work

* Full zero-knowledge voting (no reveal phase)
* Batch vote verification
* DAO and governance module integrations
* Cross-chain voting support
* Advanced privacy execution engine integration (Veil)

---

## Security Notes

* Users must securely store their vote secret
* Losing the secret prevents vote reveal
* This version is experimental and not audited

---

## License

MIT License

---

If you want, I can:

* Split this into **two tailored READMEs** (contracts vs frontend)
* Rewrite it in **grant-application tone**
* Add a **“Why Arbitrum”** or **“Why ZK”** section
* Add a **diagram description** section for judges

Just tell me.
