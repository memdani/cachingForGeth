const Web3 = require('web3');

// Replace with the appropriate HTTP provider URL for your local Geth node
const providerUrl = 'http://localhost:8545';

// Address to check
//const addressToCheck = '0xFA3D2E6Af6628a5949b1FAAE602E1b8d3784294a';

const addressToCheck = '0xf8e9Ce79B4347Ba42C5733611D4cC003DE935be2';

// Create a new Web3 instance
const web3 = new Web3(providerUrl);

// Function to check if the address exists
async function checkAddress() {
  try {
    const code = await web3.eth.getCode(addressToCheck);
    const exists = code !== '0x';
    console.log(`Address ${addressToCheck} exists: ${exists}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to check the address
checkAddress();