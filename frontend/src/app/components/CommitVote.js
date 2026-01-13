import { useState } from "react";
import { getCommitmentHash, getContract } from "../utils/veilVote";

export default function CommitVote({ provider, contractAddress, abi, proposalId }) {
  const [vote, setVote] = useState(true);
  const [secret, setSecret] = useState("");

  const commitVote = async () => {
    if (!provider) return alert("Connect wallet first");

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const commitment = getCommitmentHash(proposalId, vote, secret, address);
    const contract = getContract(provider, contractAddress, abi);

    const tx = await contract.commit_vote(proposalId, commitment);
    await tx.wait();
    alert("Vote committed! Save your secret for reveal: " + secret);
  };

  return (
    <div>
      <label>
        Vote:
        <select value={vote ? "yes" : "no"} onChange={e => setVote(e.target.value === "yes")}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <label>
        Secret (32 bytes hex):
        <input value={secret} onChange={e => setSecret(e.target.value)} placeholder="0x..." />
      </label>
      <br />
      <button onClick={commitVote}>Commit Vote</button>
    </div>
  );
}
