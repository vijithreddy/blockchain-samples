const Web3 = require('web3')
const Tx = require("ethereumjs-tx").Transaction
const Web3js = new Web3(new Web3.providers.HttpProvider("https://LC44ASX5HWDEJXVI7W7X:QVPOZQBS5TCTSSQAVHCZ52DPYNQVJ72G7BFCSKHN@319f0414-0a9f-4ec4-b9d9-cb982cfda29b.ethereum.bison.run"))
const privKey = process.env.YOUR_PRIVATE_KEY
let tokenAddress = '0xe152a2AA201F3bA7013f2f7f21ab6e1d42bE9DF5' // TAM contract address
let toAddress = '0x19A82ea68ed576c2a5610842d9f0f72460069564' // where to send it
let fromAddress = '0x8a3139855AC570e0cB9a046716Cd57030Cdd64c9' // your wallet
let privateKey = Buffer.from(privKey, 'hex')
let contractABI = [{ "inputs": [{ "internalType": "uint256", "name": "total", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "tokenOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "delegate", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegate", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "buyer", "type": "address" }, { "internalType": "uint256", "name": "numTokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]




let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

contract.methods.balanceOf(fromAddress).call().then(console.log)


let amount = Web3js.utils.toHex("1E18")



Web3js.eth.getTransactionCount(fromAddress)
    .then((count) => {
        console.log(amount)

        let rawTransaction = {
            'from': fromAddress,
            'gasPrice': Web3js.utils.toHex(20 * 1e9),
            'gasLimit': Web3js.utils.toHex(1000000),
            'to': tokenAddress,
            'value': 0x0,
            'data': contract.methods.transfer(toAddress, amount).encodeABI(),
            'nonce': Web3js.utils.toHex(count)
        }

        const transaction = new Tx(rawTransaction, { chain: 'ropsten' })
        transaction.sign(privateKey)
        Web3js.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
            .on('transactionHash', console.log)

    });
