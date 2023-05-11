const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Change to your Ethereum node's URL
const fs = require("fs");

const simpleContractAbi = "../"

const contractList = [
    {
        "address": "0x7b4A7c78b6e07D976C5C02b28F4C07C26198C9F6", //simple.sol
        "abi": [ { "inputs": [], "name": "getMessage", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_message", "type": "string" } ], "name": "setMessage", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ] 
       
    },

    {
        "address": "0x925dfCeE7255E25c9d7D5Cc4b959F0b6B5A38714", //voting.sol
        "abi": [ { "inputs": [ { "internalType": "string", "name": "option", "type": "string" } ], "name": "getVoteCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "option", "type": "string" } ], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ], 
       
    },

    {
        "address": "0x4DaA1f42e939221d077BE3a0B907411C365B8520", //auction.sol
        "abi": [ { "inputs": [], "name": "bid", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "getHighestBid", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getHighestBidder", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ], 
       
    },

    {
        "address": "0x1512fa2FEC532CFf7A00FA72035E458823d47e2A", //market.sol
        "abi": [ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_price", "type": "uint256" } ], "name": "addItem", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "getItem", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getItemCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string[]", "name": "", "type": "string[]" }, { "internalType": "uint256[]", "name": "", "type": "uint256[]" } ], "stateMutability": "view", "type": "function" } ], 
       
    },

    {
        "address": "0x3FDDaAB35f296B9f43F0Dd053Fd5c2D56060C165", //bank.sol
        "abi": [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "deposit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_account", "type": "address" } ], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ],
    },

    {
        "address": "0xD67F15e35C0889869512222f89b3a181fa8532f3", //personal info
        "abi": [ { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "retrieveInfoForAddress", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_age", "type": "uint256" }, { "internalType": "string", "name": "_email", "type": "string" } ], "name": "storeInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ],
    },

    {
        "address": "0xa17a273a419189aA4a34a018c43A405A23DcF9E8", //task list
        "abi": [ { "inputs": [ { "internalType": "uint256", "name": "_index", "type": "uint256" } ], "name": "completeTask", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_title", "type": "string" } ], "name": "createTask", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "string", "name": "", "type": "string" }, { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]
    },

    {
        "address":"0x3C3b17aa4daAFBa14c0F7Ab5F9b078366ae70128", //rewards
        "abi":[ { "inputs": [ { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "addReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "rewards", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
    },

    {
        "address": "0x6643192246fAf7b70632f13831d9D58C5Ad05916", //counter
        "abi": [ { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "getCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
    },

    {
        "address": "0x5B9aBFE73f5b9AD39BC1666066162A259b3AaE55", //identity
        "abi": [ { "inputs": [ { "internalType": "bytes32", "name": "_name", "type": "bytes32" }, { "internalType": "bytes32", "name": "_email", "type": "bytes32" } ], "name": "createIdentity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_permission", "type": "bytes32" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "grantPermission", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes32", "name": "_permission", "type": "bytes32" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "revokePermission", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "verifyIdentity", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "retrieveInfo", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bytes32", "name": "", "type": "bytes32" }, { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" } ]
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

    var randIndex = Math.floor(Math.random() * 10);
    abi = contractList[randIndex]['abi'];
    address = contractList[randIndex]['address'];

    const contract = new web3.eth.Contract(abi, address);


    try {
        // Call the getMessage() function
        const message = await contract.methods.retrieveInfo().call();
        // Print the message
        console.log('Message:', message);
        return message;
    } catch (error) {
        console.error('Error:', error);
        return error;
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
    return d.getTime();

}


async function del(){
    await new Promise(resolve => setTimeout(resolve, 5000));
}

async function run() {
    const logfile = "./logs/logfile.txt";

    while (true) {

        const startTime = await createLogEntry(logfile,"Calling Contract");
        const msg = await callContract();
        // await del();
        const endTime = await createLogEntry(logfile,msg);
        const latency = (endTime - startTime);
        const latencyLogEntry = "Latency = " + String(latency);
        createLogEntry(logfile,latencyLogEntry);
        fs.appendFile(logfile,"--------------------------------------\n",(err,file) => { if(err) throw err;})
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before calling again
        
    }
}

run();