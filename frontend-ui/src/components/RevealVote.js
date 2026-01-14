import { useState } from "react";
import { getContract } from "../utils/veilVote";

export default function Reveal({ provider, contractAddress, abi, proposalId }) {
  const [vote, setVote] = useState(true);
  const [secret, setSecret] = useState("");

  const revealVote = async () => {
    if (!provider) return alert("Connect wallet first");

    const contract = getContract(provider, contractAddress, abi);
    const tx = await contract.reveal_vote(proposalId, vote, secret);
    await tx.wait();
    alert("Vote revealed!");
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
        Secret:
        <input value={secret} onChange={e => setSecret(e.target.value)} placeholder="0x..." />
      </label>
      <br />
      <button onClick={revealVote}>Reveal Vote</button>
    </div>
  );
}
