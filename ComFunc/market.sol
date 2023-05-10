// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MarketplaceContract {
    struct Item {
        uint id;
        string name;
        uint price;
    }

    Item[] private items;

    function addItem(string memory _name, uint _price) external {
        items.push(Item(items.length, _name, _price));
    }

    function getItemCount() external view returns (uint) {
        return items.length;
    }

    function getItem(uint _index) external view returns (string memory, uint) {
        require(_index < items.length, "Item does not exist");
        return (items[_index].name, items[_index].price);
    }

    function retrieveInfo() external view returns (string[] memory, uint[] memory) {
        string[] memory itemNames = new string[](items.length);
        uint[] memory itemPrices = new uint[](items.length);
        for (uint i = 0; i < items.length; i++) {
            itemNames[i] = items[i].name;
            itemPrices[i] = items[i].price;
        }
        return (itemNames, itemPrices);
    }
}
