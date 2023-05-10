const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Change to your Ethereum node's URL
const fs = require("fs");

const simpleContractAbi = "../"

const contractList = [
    {
        "address": "0x7b4A7c78b6e07D976C5C02b28F4C07C26198C9F6",
        "abi": [ { "inputs": [], "name": "getMessage", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_message", "type": "string" } ], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ] 
       
    },

    {
        "address": "0x925dfCeE7255E25c9d7D5Cc4b959F0b6B5A38714",
        "abi": [ { "inputs": [ { "internalType": "string", "name": "option", "type": "string" } ], "name": "getVoteCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "option", "type": "string" } ], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ], 
       
    },

    {
        "address": "0x4DaA1f42e939221d077BE3a0B907411C365B8520",
        "abi": [ { "inputs": [], "name": "bid", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getHighestBid", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHighestBidder", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ], 
       
    },

    {
        "address": "0x1512fa2FEC532CFf7A00FA72035E458823d47e2A",
        "abi": [ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_price", "type": "uint256" } ], "name": "addItem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "getItem", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getItemCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string[]", "name": "", "type": "string[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" } ], 
       
    },

    {
        "address": "0x3FDDaAB35f296B9f43F0Dd053Fd5c2D56060C165",
        "abi": [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_account", "type": "address" } ], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ],
    }
]

// const abiFile = fs.readFileSync('./abi/simple/simple_sol_MyContract.abi');

// const abi = JSON.parse(abiFile);
// const abi = [{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"message","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
// const address = "0xFA3D2E6Af6628a5949b1FAAE602E1b8d3784294a"


// const ethCallerAbi = [
//     // Paste in the ABI for the ETHCaller contract here
// ];

// const ethCallerAddress = ''; // Replace with the address of your deployed ETHCaller contract



// async function callExternalContract() {
//     const externalContractAddress = '0xFc1fBDaECf9e9cbf70890EDD112F05Cbd77f94A1'; // Replace with the address of the external contract you want to call
//     const amount = web3.utils.toWei('1', 'ether'); // Replace with the amount of ETH you want to send

//     try {
//         await ethCaller.methods.callExternalContract(externalContractAddress, amount).send();
//         console.log(`Sent ${web3.utils.fromWei(amount, 'ether')} ETH to ${externalContractAddress}`);
//     } catch (error) {
//         console.error(`Failed to send ETH: ${error}`);
//     }
// }



async function callContract(){
    //const contract = new web3.eth.Contract(abi, address);

    var randIndex = Math.floor(Math.random() * 5);
    abi = contractList[randIndex]['abi'];
    address = contractList[randIndex]['address'];

    const contract = new web3.eth.Contract(abi, address);


    try {
        // Call the getMessage() function
        const message = await contract.methods.retrieveInfo().call();
        // Print the message
        console.log('Message:', message);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createLogEntry(logfile, entryVal){
    const d = new Date();
    var datetime = d.getDate() + "/"
                + (d.getMonth()+1)  + "/" 
                + d.getFullYear() + " @ "  
                + d.getHours() + ":"  
                + d.getMinutes() + ":" 
                + d.getSeconds();
    const logEntry = String(entryVal) + " : " + String(d.getTime()) + "----" + String(datetime) + "\n";
    fs.appendFile(logfile,logEntry,(err,file) => { if(err) throw err;})
    console.log(logEntry);

}


async function del(){
    await new Promise(resolve => setTimeout(resolve, 5000));
}

async function run() {
    const logfile = "./logs/logfile.txt";

    while (true) {

        await createLogEntry(logfile,"Calling Contract");
        await callContract();
        // await del();
        await createLogEntry(logfile,"Output received");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before calling again
        
    }
}

run();