// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BankContract {
    address private owner;
    mapping (address => uint) private balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getBalance(address _account) external view returns (uint) {
        return balances[_account];
    }

    function retrieveInfo() external view returns (uint, address) {
        return (address(this).balance, owner);
    }
}
