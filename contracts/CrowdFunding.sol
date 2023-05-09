// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Crowdfunding {
    address payable public owner;
    mapping(address => uint) public contributions;
    uint public totalContributions;
    uint public goal;
    uint public deadline;
    bool public campaignEnded;
    
    event CampaignStarted(address owner, uint goal, uint deadline);
    event ContributionReceived(address contributor, uint amount);
    event CampaignEnded(bool succeeded, uint totalContributions);
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
    
    constructor(uint _goal, uint _deadline) {
        owner = payable(msg.sender);
        goal = _goal;
        deadline = block.timestamp + _deadline;
        emit CampaignStarted(owner, goal, deadline);
    }
    
    function contribute() public payable {
        require(!campaignEnded, "Campaign has already ended");
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit ContributionReceived(msg.sender, msg.value);
    }
    
    function checkGoalReached() public onlyOwner {
        require(block.timestamp >= deadline, "Deadline has not been reached");
        if (totalContributions >= goal) {
            owner.transfer(address(this).balance);
            campaignEnded = true;
            emit CampaignEnded(true, totalContributions);
        } else {
            campaignEnded = true;
            emit CampaignEnded(false, totalContributions);
        }
    }
}
