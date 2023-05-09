const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Change to your Ethereum node's URL
const fs = require("fs");


const ethCallerAbi = [
    // Paste in the ABI for the ETHCaller contract here
];

const ethCallerAddress = ''; // Replace with the address of your deployed ETHCaller contract

const ethCaller = new web3.eth.Contract(ethCallerAbi, ethCallerAddress);




async function callExternalContract() {
    const externalContractAddress = '0x987654321...'; // Replace with the address of the external contract you want to call
    const amount = web3.utils.toWei('1', 'ether'); // Replace with the amount of ETH you want to send

    try {
        await ethCaller.methods.callExternalContract(externalContractAddress, amount).send();
        console.log(`Sent ${web3.utils.fromWei(amount, 'ether')} ETH to ${externalContractAddress}`);
    } catch (error) {
        console.error(`Failed to send ETH: ${error}`);
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
        await callExternalContract();
        // await del();
        await createLogEntry(logfile,"Output received");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before calling again
        
    }
}

run();