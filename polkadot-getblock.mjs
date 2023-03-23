import { ApiPromise, HttpProvider,WsProvider} from '@polkadot/api';

async function main () {
  // Here we don't pass the (optional) provider, connecting directly to the default
  // node/port, i.e. `ws://127.0.0.1:9944`. Await for the isReady promise to ensure
  // the API has connected to the node and completed the initialisation process
  //const httpProvider =new HttpProvider('https://6XELDPUK7ADADT3SWLLY:HUDNZ7CFO6VC5LK4RA6OE5K4PQVFXVONYSG2IWZT@80570985-00a0-47ca-ac37-d079ce847af6.polkadot.bison.run/rpc');
  //const api = await ApiPromise.create({ provider: httpProvider });

  
  const provider = new WsProvider('wss://rpc.polkadot.io/');
  
  const api = await ApiPromise.create({ provider });

  
  // Retrieve the chain name
  const chain = await api.rpc.system.chain();
  
  // Retrieve the latest header
  const lastHeader = await api.rpc.chain.getHeader();
  const validators=await api.query.session.validators();
  
  // Log the information
  //console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
  console.log(validators)
}

main();

/*

curl -X GET https://6XELDPUK7ADADT3SWLLY:HUDNZ7CFO6VC5LK4RA6OE5K4PQVFXVONYSG2IWZT@80570985-00a0-47ca-ac37-d079ce847af6.polkadot.bison.run/rpc/status

curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlock", "params":["0xf193576f1b6359bbf50027bdf46cae1b493341da26c538fc5ecae210f1666df4"]}' https://6XELDPUK7ADADT3SWLLY:HUDNZ7CFO6VC5LK4RA6OE5K4PQVFXVONYSG2IWZT@80570985-00a0-47ca-ac37-d079ce847af6.polkadot.bison.run/rpc/


curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "chain_getBlockHash", "params":["10685668"]}' https://6XELDPUK7ADADT3SWLLY:HUDNZ7CFO6VC5LK4RA6OE5K4PQVFXVONYSG2IWZT@80570985-00a0-47ca-ac37-d079ce847af6.polkadot.bison.run/rpc/


curl --user FVCP4ORWPHPEDMWVG2BU:5QQBL337KI4RAAUYNZ25OPOL75UPI543LNTIPAER \
    --header 'Content-Type: application/json' \
    --data '{"jsonrpc":"2.0","method":"eth_getBalance",
        "params":["0x742d35cc6634c0532925a3b844bc454e4438f44e",
            "latest"],"id":1}' \
    https://2f9c52e0-c2db-4687-b81c-67e834fe65f5.ethereum.bison.run


curl https://2f9c52e0-c2db-4687-b81c-67e834fe65f5.ethereum.bison.run \
  -u FVCP4ORWPHPEDMWVG2BU:5QQBL337KI4RAAUYNZ25OPOL75UPI543LNTIPAER \
  -X POST \
  -H 'Content-Type: text/plain' \
  -d '{
  "method": "coinbaseCloud_getTransactionsByAddress",
  "params": {
    "address": "0xEA51ddA8D548fef9F036ef842DF69eCD8bd3Eff4",
    "blockStart": 14005668,
    "blockEnd": 14674642,
    "addressFilter": "SENDER",
    "blockchain": "Ethereum",
    "network":"Mainnet"
  },
  "id": 1,
  "jsonrpc": "2.0"
}'


curl -u  -X 
CURL https://EO45MXRK6KV57Z23O5ZY:CDLQ7ZOGCHF4SOULNN5VZZPPMKUJNB2Y2FRHV5DU@159b95d9-890d-4bf1-b4f4-bcd990c38e37.algorand.bison.run/indexer/v2/accounts/C7RYOGEWDT7HZM3HKPSMU7QGWTRWR3EPOQTJ2OHXGYLARD3X62DNWELS34/transactions?txid=EL2CWFOJVPHFKX4EDEICLHQFT4T7KJW6G652HRUCNFYQQFADBJHA

*/