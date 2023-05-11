// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract RewardsProgram {
    struct Reward {
        uint256 id;
        string name;
        uint256 amount;
    }

    mapping(uint256 => Reward) public rewards;
    uint256 public rewardCount;

    constructor() {
        rewardCount = 0;
    }

    function addReward(string memory _name, uint256 _amount) public {
        rewardCount++;
        rewards[rewardCount] = Reward(rewardCount, _name, _amount);
    }

    function retrieveInfo() public view returns (uint256, uint256) {
        return (rewardCount, block.timestamp);
    }
}
