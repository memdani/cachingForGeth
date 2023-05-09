// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    address payable public owner;
    uint public totalItems;
    mapping (uint => Item) public items;
    mapping (address => uint[]) public itemsBySeller;
    
    struct Item {
        uint id;
        string name;
        string description;
        uint price;
        bool sold;
        address payable seller;
        address payable buyer;
    }
    
    event ItemAdded(uint id, string name, string description, uint price, address seller);
    event ItemSold(uint id, string name, string description, uint price, address seller, address buyer);
    
    constructor() {
        owner = payable(msg.sender);
        totalItems = 0;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can perform this action.");
        _;
    }
    
    function addItem(string memory name, string memory description, uint price) public {
        totalItems++;
        items[totalItems] = Item(totalItems, name, description, price, false, payable(msg.sender), payable(address(0)));
        itemsBySeller[msg.sender].push(totalItems);
        emit ItemAdded(totalItems, name, description, price, msg.sender);
    }
    
    function buyItem(uint itemId) public payable {
        require(items[itemId].sold == false, "Item already sold.");
        require(msg.value == items[itemId].price, "Incorrect payment amount.");
        
        items[itemId].sold = true;
        items[itemId].buyer = payable(msg.sender);
        items[itemId].seller.transfer(msg.value);
        emit ItemSold(itemId, items[itemId].name, items[itemId].description, items[itemId].price, items[itemId].seller, msg.sender);
    }
    
    function getItemsBySeller(address seller) public view returns (uint[] memory) {
        return itemsBySeller[seller];
    }
    
    function withdrawFunds() public onlyOwner {
        owner.transfer(address(this).balance);
    }
}
