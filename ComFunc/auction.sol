// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AuctionContract {
    uint private highestBid;
    address private highestBidder;

    function bid() external payable {
        require(msg.value > highestBid, "Bid too low");
        highestBid = msg.value;
        highestBidder = msg.sender;
    }

    function getHighestBid() external view returns (uint) {
        return highestBid;
    }

    function getHighestBidder() external view returns (address) {
        return highestBidder;
    }

    function retrieveInfo() external view returns (uint, address) {
        return (highestBid, highestBidder);
    }
}
