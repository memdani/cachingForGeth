const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Change to your Ethereum node's URL
const fs = require("fs");

const simpleContractAbi = "../"

// const contractList = [
//     {
//         "address": " ",
//         "abi": " ", 
//         "function": " "
//     }
// ]

// const abiFile = fs.readFileSync('./abi/simple/simple_sol_MyContract.abi');

// const abi = JSON.parse(abiFile);
const abi = [{"inputs":[],"name":"getMessage","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"message","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const address = "0xFA3D2E6Af6628a5949b1FAAE602E1b8d3784294a"


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
    const contract = new web3.eth.Contract(abi, address);
    try {
        // Call the getMessage() function
        const message = await contract.methods.getMessage().call();
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