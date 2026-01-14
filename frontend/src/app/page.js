
'use client'
import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet";
import CommitVote from "../components/CommitVote";
import RevealVote from "../components/RevealVote";
import veilVoteAbi from "../abi/VeilVote.json"; // from Stylus deploy

const CONTRACT_ADDRESS = "0xE9b643d567A8Ec775a678012CD2a63BEAeF8F102";

export default function Home() {
  const [provider, setProvider] = useState(null);

  return (
    <div>
      <h1>Veil Vote</h1>
      <ConnectWallet onConnect={(address, prov) => setProvider(prov)} />
      {provider && (
        <>
          <CommitVote provider={provider} contractAddress={CONTRACT_ADDRESS} abi={veilVoteAbi} proposalId={0} />
          <RevealVote provider={provider} contractAddress={CONTRACT_ADDRESS} abi={veilVoteAbi} proposalId={0} />
        </>
      )}
    </div>
  );
}
