import { ethers } from "ethers";
import keccak256 from "keccak256";

export function getCommitmentHash(proposalId, vote, secret, address) {
  const encoded = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "bool", "bytes32", "address"],
    [proposalId, vote, secret, address]
  );
  return "0x" + keccak256(encoded).toString("hex");
}

export function getContract(provider, contractAddress, abi) {
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
}
