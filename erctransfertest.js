const Web3 = require('web3')
const Web3js = new Web3(new Web3.providers.HttpProvider("https://LC44ASX5HWDEJXVI7W7X:QVPOZQBS5TCTSSQAVHCZ52DPYNQVJ72G7BFCSKHN@319f0414-0a9f-4ec4-b9d9-cb982cfda29b.ethereum.bison.run"))
const privKey = process.env.YOUR_PRIVATE_KEY //Your Private key environment variable
let tokenAddress = '0xe152a2AA201F3bA7013f2f7f21ab6e1d42bE9DF5' // TAM contract address
let toAddress = '0x19A82ea68ed576c2a5610842d9f0f72460069564' // where to send it
let fromAddress = '0x8a3139855AC570e0cB9a046716Cd57030Cdd64c9' // your wallet
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


sendErcToken()

function sendErcToken() {
    let contract = new Web3js.eth.Contract(contractABI, tokenAddress, { from: fromAddress })

    let amount = Web3js.utils.toHex("461145D5")

    let data = contract.methods.transfer(toAddress, amount).encodeABI()

    let txObj = {
        gas: Web3js.utils.toHex(1000000),
        "to": tokenAddress,
        "value": "0x00",
        "data": data,
        "from": fromAddress
    }
    Web3js.eth.accounts.signTransaction(txObj, privKey, (err, signedTx) => {
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



