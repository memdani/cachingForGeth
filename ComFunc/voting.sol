
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VotingContract {
    mapping (string => uint) private votes;

    function vote(string memory option) external {
        votes[option]++;
    }

    function getVoteCount(string memory option) external view returns (uint) {
        return votes[option];
    }

    function retrieveInfo() external view returns (uint[] memory) {
        uint[] memory voteCounts = new uint[](2);
        voteCounts[0] = votes["Option A"];
        voteCounts[1] = votes["Option B"];
        return voteCounts;
    }
}
