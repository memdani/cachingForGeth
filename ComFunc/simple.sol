// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MessageContract {
    string private message;

    function setMessage(string memory _message) external {
        message = _message;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }

    function retrieveInfo() external view returns (string memory) {
        return message;
    }
}
