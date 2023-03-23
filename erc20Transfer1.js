const Web3 = require('web3')
const Web3js = new Web3(new Web3.providers.HttpProvider("https://LC44ASX5HWDEJXVI7W7X:QVPOZQBS5TCTSSQAVHCZ52DPYNQVJ72G7BFCSKHN@319f0414-0a9f-4ec4-b9d9-cb982cfda29b.ethereum.bison.run"))
const privateKey = process.env.YOUR_PRIVATE_KEY //Your Private key environment variable
let tokenAddress = '0x4134aa5373acafc36337bf515713a943927b06e5' // Demo Token contract address
let toAddress = '0x19A82ea68ed576c2a5610842d9f0f72460069564' // where to send it
let fromAddress = '0x8a3139855AC570e0cB9a046716Cd57030Cdd64c9' // your wallet
/*
let contractABI = [
    // transfer
    {
        'constant': false,
        'inputs': [
            {
                'name': '_to',
                'type': 'address'
            },
            {
                'name': '_value',
                'type': 'uint256'
            }
        ],
        'name': 'transfer',
        'outputs': [
            {
                'name': '',
                'type': 'bool'
            }
        ],
        'type': 'function'
    }
]
*/

let contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "total", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "delegate", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegate", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]


let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

let amount = Web3js.utils.toHex(Web3js.utils.toWei("1")); //1 DEMO Token
console.log(contract.methods)


let data = contract.methods.transfer(toAddress, amount).encodeABI()

//sendErcToken()

function sendErcToken() {
    let txObj = {
        gas: Web3js.utils.toHex(100000), 
        "to": tokenAddress,
        "value": "0x00",
        "data": data,
        "from": fromAddress
    }
    Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
        if (err) {
            return callback(err)
        } else {
            console.log(signedTx)
            return Web3js.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }
            })
        }
    })
}
