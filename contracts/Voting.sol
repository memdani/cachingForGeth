// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Voter {
        bool voted;
        uint vote;
    }

    struct Proposal {
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;

    constructor() {
        owner = msg.sender;
        proposals.push(Proposal({
            name: "Proposal A",
            voteCount: 0
        }));
        proposals.push(Proposal({
            name: "Proposal B",
            voteCount: 0
        }));
    }

    function registerVoter(address voter) public {
        require(msg.sender == owner, "Only owner can register voters.");
        require(!voters[voter].voted, "The voter already voted.");
        voters[voter].voted = false;
        voters[voter].vote = 0;
    }

    function vote(uint proposal) public {
        require(!voters[msg.sender].voted, "The voter already voted.");
        require(proposal < proposals.length, "Invalid proposal index.");
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = proposal;
        proposals[proposal].voteCount += 1;
    }

    function winningProposal() public view returns (uint winningProposal_) {
        uint winningVoteCount = 0;
        for (uint i = 0; i < proposals.length; i++) {
            if (proposals[i].voteCount > winningVoteCount) {
                winningVoteCount = proposals[i].voteCount;
                winningProposal_ = i;
            }
        }
    }

    function winnerName() public view returns (string memory winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
