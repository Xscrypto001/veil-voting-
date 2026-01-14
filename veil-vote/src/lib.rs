#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

use stylus_sdk::prelude::*;
use stylus_sdk::alloy_primitives::{Address, U256, FixedBytes};
use stylus_sdk::crypto::keccak;
use stylus_sdk::{block, msg};
use alloc::vec::Vec;

sol_storage! {
    #[entrypoint]
    pub struct VeilVote {
        uint256 proposal_count;
        
        // proposal_id => Proposal
        mapping(uint256 => Proposal) proposals;
        
        // (proposal_id, commitment_hash) => committed?
        mapping(uint256 => mapping(bytes32 => bool)) commitments;
        
        // (proposal_id, commitment_hash) => revealed?
        mapping(uint256 => mapping(bytes32 => bool)) revealed;
    }
    
    pub struct Proposal {
        uint256 commit_end;
        uint256 reveal_end;
        uint256 yes_votes;
        uint256 no_votes;
        bool finalized;
    }
}

#[external]
#[inherit(VeilVote)]
impl VeilVote {
    /*───────────────────────────────*/
    /* PROPOSAL MANAGEMENT            */
    /*───────────────────────────────*/

    pub fn create_proposal(
        &mut self,
        commit_end: U256,
        reveal_end: U256,
    ) -> U256 {
        assert!(commit_end < reveal_end, "Invalid phase order");

        let id = self.proposal_count.get();
        self.proposal_count.set(id + U256::from(1));

        let mut proposal = self.proposals.setter(id);
        proposal.commit_end.set(commit_end);
        proposal.reveal_end.set(reveal_end);
        proposal.yes_votes.set(U256::ZERO);
        proposal.no_votes.set(U256::ZERO);
        proposal.finalized.set(false);

        id
    }

    /*───────────────────────────────*/
    /* COMMIT PHASE                   */
    /*───────────────────────────────*/

    pub fn commit_vote(&mut self, proposal_id: U256, commitment: FixedBytes<32>) {
        let block_num = block::number();
        let proposal = self.proposals.get(proposal_id);

        assert!(U256::from(block_num) <= proposal.commit_end.get(), "Commit phase over");

        let is_committed = self.commitments.getter(proposal_id).get(commitment);
        assert!(!is_committed, "Already committed");

        self.commitments.setter(proposal_id).insert(commitment, true);
    }

    /*───────────────────────────────*/
    /* REVEAL PHASE                   */
    /*───────────────────────────────*/

    pub fn reveal_vote(
        &mut self,
        proposal_id: U256,
        vote: bool, // true = yes, false = no
        secret: FixedBytes<32>,
    ) {
        let block_num = block::number();
        let proposal = self.proposals.get(proposal_id);

        assert!(U256::from(block_num) > proposal.commit_end.get(), "Reveal not started");
        assert!(U256::from(block_num) <= proposal.reveal_end.get(), "Reveal phase over");

        let sender = msg::sender();

        // Manually encode the data for hashing
        let mut data = Vec::new();
        data.extend_from_slice(&proposal_id.to_be_bytes::<32>());
        data.push(if vote { 1u8 } else { 0u8 });
        data.extend_from_slice(secret.as_slice());
        data.extend_from_slice(sender.as_slice());

        let hash = keccak(&data);

        let is_committed = self.commitments.getter(proposal_id).get(hash);
        assert!(is_committed, "Invalid commitment");

        let is_revealed = self.revealed.getter(proposal_id).get(hash);
        assert!(!is_revealed, "Already revealed");

        self.revealed.setter(proposal_id).insert(hash, true);

        let mut proposal_mut = self.proposals.setter(proposal_id);
        if vote {
            let current_yes = proposal_mut.yes_votes.get();
            proposal_mut.yes_votes.set(current_yes + U256::from(1));
        } else {
            let current_no = proposal_mut.no_votes.get();
            proposal_mut.no_votes.set(current_no + U256::from(1));
        }
    }

    /*───────────────────────────────*/
    /* FINALIZATION                   */
    /*───────────────────────────────*/

    pub fn finalize(&mut self, proposal_id: U256) {
        let block_num = block::number();
        let proposal = self.proposals.get(proposal_id);

        assert!(U256::from(block_num) > proposal.reveal_end.get(), "Reveal not finished");
        assert!(!proposal.finalized.get(), "Already finalized");

        self.proposals.setter(proposal_id).finalized.set(true);
    }

    /*───────────────────────────────*/
    /* READ METHODS                   */
    /*───────────────────────────────*/

    pub fn get_results(&self, proposal_id: U256) -> (U256, U256, bool) {
        let proposal = self.proposals.get(proposal_id);
        (
            proposal.yes_votes.get(),
            proposal.no_votes.get(),
            proposal.finalized.get(),
        )
    }
}