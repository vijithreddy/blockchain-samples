const ethers = require('ethers');

//Variables for the SendETH function
let gas_limit = "0x100000"
const fromAddress = '0x19A82ea68ed576c2a5610842d9f0f72460069564'
const toAddress = '0x8a3139855AC570e0cB9a046716Cd57030Cdd64c9'
const private_key = process.env.PRIVATE_KEY
value = '0.01'


sendETH(fromAddress, toAddress, private_key, value)

function sendETH(from_address, to_address, privatekey, value) {
    const endpoint = {
        url: process.env.ROP_QT_ENDPOINT,
        user: process.env.ROP_QT_USERNAME,
        password: process.env.ROP_QT_PASSWORD,
        headers: 'Content-Type: application/json'
    }

    let provider = new ethers.providers.JsonRpcProvider(endpoint, 'ropsten');
    let wallet = new ethers.Wallet(private_key)
    let walletSigner = wallet.connect(provider)
    const tx = {
        from: fromAddress,
        to: toAddress,
        value: ethers.utils.parseEther(value),
        gasLimit: ethers.utils.hexlify(gas_limit),
    }

    walletSigner.sendTransaction(tx).then((transaction) => {
        console.log("Send finished!, Here's the transaction hash", transaction.hash)
    })

}

