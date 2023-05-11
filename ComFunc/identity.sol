// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract IdentitySystem {
    struct Identity {
        bytes32 name;
        bytes32 email;
        bool verified;
        mapping (bytes32 => bool) permissions;
    }
    
    mapping (address => Identity) private identities;
    mapping (bytes32 => address) private identityAddresses;
    
    function createIdentity(bytes32 _name, bytes32 _email) public {
        require(identityAddresses[_email] == address(0), "Email is already taken");
        
        Identity storage identity = identities[msg.sender];
        identity.name = _name;
        identity.email = _email;
        identityAddresses[_email] = msg.sender;
    }
    
    function verifyIdentity(address _user) public {
        require(msg.sender == _user || identities[msg.sender].permissions["admin"], "Unauthorized");
        
        Identity storage identity = identities[_user];
        identity.verified = true;
    }
    
    function grantPermission(bytes32 _permission, address _user) public {
        require(msg.sender == identityAddresses[identities[_user].email] || identities[msg.sender].permissions["admin"], "Unauthorized");
        
        Identity storage identity = identities[_user];
        identity.permissions[_permission] = true;
    }
    
    function revokePermission(bytes32 _permission, address _user) public {
        require(msg.sender == identityAddresses[identities[_user].email] || identities[msg.sender].permissions["admin"], "Unauthorized");
        
        Identity storage identity = identities[_user];
        identity.permissions[_permission] = false;
    }
    
    function retrieveInfo() public view returns (bytes32, bytes32, bool) {
        Identity storage identity = identities[msg.sender];
        return (identity.name, identity.email, identity.verified);
    }
}
