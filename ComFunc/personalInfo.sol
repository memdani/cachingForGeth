// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract PersonalInfo {
    struct Info {
        string name;
        uint256 age;
        string email;
    }

    mapping(address => Info) private personalInfos;

    function storeInfo(string calldata _name, uint256 _age, string calldata _email) external {
        personalInfos[msg.sender] = Info(_name, _age, _email);
    }

    function retrieveInfo() external view returns (string memory, uint256, string memory) {
        Info memory info = personalInfos[msg.sender];
        return (info.name, info.age, info.email);
    }

    function retrieveInfoForAddress(address _address) external view returns (string memory, uint256, string memory) {
        Info memory info = personalInfos[_address];
        return (info.name, info.age, info.email);
    }
}
