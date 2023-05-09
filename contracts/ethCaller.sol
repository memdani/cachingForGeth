pragma solidity ^0.8.0;

contract ExternalContract {
    uint256 public totalAmount;

    receive() external payable {
        totalAmount += msg.value;
    }
}

contract ETHCaller {
    function callExternalContract(address externalContract, uint256 amount) public {
        (bool success, ) = externalContract.call{value: amount}("");
        require(success, "ETH transfer failed");
    }
}

contract MyContract {
    address public externalContractAddress;
    ETHCaller public ethCaller;

    constructor(address _externalContractAddress, address _ethCallerAddress) {
        externalContractAddress = _externalContractAddress;
        ethCaller = ETHCaller(_ethCallerAddress);
    }

    function sendETH(uint256 amount) public {
        ethCaller.callExternalContract{value: amount}(externalContractAddress, amount);
    }
}