const Web3=require("web3");
const privKey ='2d613ba931e6e493fb9a11b266dc8e835357fa6f39ff2b9e93cc865f8f8c9dd7'
const web3=new Web3(new Web3.providers.HttpProvider("https://LC44ASX5HWDEJXVI7W7X:QVPOZQBS5TCTSSQAVHCZ52DPYNQVJ72G7BFCSKHN@319f0414-0a9f-4ec4-b9d9-cb982cfda29b.ethereum.bison.run"));
const fromAddress = '0x19A82ea68ed576c2a5610842d9f0f72460069564'
const toAddress='0x8a3139855AC570e0cB9a046716Cd57030Cdd64c9'


// Create transaction
const deploy = async () => {
  console.log(
     'Attempting to make transaction from '+fromAddress +'to ' +toAddress
  );
  

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
       from: fromAddress,
       to: toAddress,
       value: web3.utils.toWei('0.01', 'ether'),
       gas: '21000',
    },
    privKey
 );

 const createReceipt = await web3.eth.sendSignedTransaction(
  createTransaction.rawTransaction
);
console.log(
  `Transaction successful with hash: ${createReceipt.transactionHash}`
);
};

deploy();