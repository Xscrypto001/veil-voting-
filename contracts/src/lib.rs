use stylus_sdk::prelude::*;
use stylus_sdk::storage::{Mapping, StorageBool, StorageU64};
use stylus_sdk::crypto::keccak256;

#[storage]
pub struct VeilVote {
    proposal_count: StorageU64,

    // proposal_id => Proposal
    proposals: Mapping<u64, Proposal>,

    // (proposal_id, commitment_hash) => committed?
    commitments: Mapping<(u64, B256), StorageBool>,

    // (proposal_id, commitment_hash) => revealed?
    revealed: Mapping<(u64, B256), StorageBool>,
}

#[storage]
#[derive(Default)]
pub struct Proposal {
    commit_end: StorageU64,
    reveal_end: StorageU64,
    yes_votes: StorageU64,
    no_votes: StorageU64,
    finalized: StorageBool,
}

#[entrypoint]
impl VeilVote {
    /*───────────────────────────────*/
    /* PROPOSAL MANAGEMENT            */
    /*───────────────────────────────*/

    pub fn create_proposal(
        &mut self,
        commit_end: u64,
        reveal_end: u64,
    ) -> u64 {
        assert!(commit_end < reveal_end, "Invalid phase order");

        let id = self.proposal_count.get();
        self.proposal_count.set(id + 1);

        let mut proposal = Proposal::default();
        proposal.commit_end.set(commit_end);
        proposal.reveal_end.set(reveal_end);

        self.proposals.insert(id, proposal);
        id
    }

    /*───────────────────────────────*/
    /* COMMIT PHASE                   */
    /*───────────────────────────────*/

    pub fn commit_vote(&mut self, proposal_id: u64, commitment: B256) {
        let block = block::number();
        let proposal = self.proposals.get(proposal_id).expect("Proposal not found");

        assert!(block <= proposal.commit_end.get(), "Commit phase over");

        let key = (proposal_id, commitment);
        assert!(
            !self.commitments.get(key).unwrap_or_default().get(),
            "Already committed"
        );

        self.commitments.insert(key, StorageBool::from(true));
    }

    /*───────────────────────────────*/
    /* REVEAL PHASE                   */
    /*───────────────────────────────*/

    pub fn reveal_vote(
        &mut self,
        proposal_id: u64,
        vote: bool, // true = yes, false = no
        secret: B256,
    ) {
        let block = block::number();
        let proposal = self.proposals.get(proposal_id).expect("Proposal not found");

        assert!(block > proposal.commit_end.get(), "Reveal not started");
        assert!(block <= proposal.reveal_end.get(), "Reveal phase over");

        let sender = msg::sender();

        let hash = keccak256((
            proposal_id,
            vote,
            secret,
            sender,
        ));

        let key = (proposal_id, hash);

        assert!(
            self.commitments.get(key).unwrap_or_default().get(),
            "Invalid commitment"
        );

        assert!(
            !self.revealed.get(key).unwrap_or_default().get(),
            "Already revealed"
        );

        self.revealed.insert(key, StorageBool::from(true));

        if vote {
            proposal.yes_votes.set(proposal.yes_votes.get() + 1);
        } else {
            proposal.no_votes.set(proposal.no_votes.get() + 1);
        }
    }

    /*───────────────────────────────*/
    /* FINALIZATION                   */
    /*───────────────────────────────*/

    pub fn finalize(&mut self, proposal_id: u64) {
        let block = block::number();
        let proposal = self.proposals.get(proposal_id).expect("Proposal not found");

        assert!(block > proposal.reveal_end.get(), "Reveal not finished");
        assert!(!proposal.finalized.get(), "Already finalized");

        proposal.finalized.set(true);
    }

    /*───────────────────────────────*/
    /* READ METHODS                   */
    /*───────────────────────────────*/

    pub fn get_results(&self, proposal_id: u64) -> (u64, u64, bool) {
        let proposal = self.proposals.get(proposal_id).expect("Proposal not found");
        (
            proposal.yes_votes.get(),
            proposal.no_votes.get(),
            proposal.finalized.get(),
        )
    }
}
