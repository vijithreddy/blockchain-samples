from web3 import Web3
import requests
import json
import os

USER = os.getenv('MAIN_USER')
PASSWORD = os.environ.get('MAIN_PASS')
ENDPOINT=os.environ.get('MAIN_ENDPOINT')

#Create a session with username and password
session = requests.Session()
session.auth = (USER, PASSWORD)

#Connect to your Node
w3 = Web3(Web3.HTTPProvider(ENDPOINT, session=session))

# Get latest block
latest_block = w3.eth.block_number
print('Latest Ethereum Block is', latest_block)

# Get info about block
blockInfo = w3.eth.get_block(latest_block)
list_of_transactions= w3.eth.get_block_transaction_count(latest_block)
print ("Block number: ",latest_block," has ",list_of_transactions," transactions")

transaction_list=[]
for transaction_index in range(list_of_transactions):
    transaction_info=w3.eth.get_transaction_by_block(latest_block,transaction_index)
    transaction_list.append(dict(transaction_info))


list_of_transactions = w3.toJSON(transaction_list)
parsed = json.loads(list_of_transactions)
indented_JSON = json.dumps(parsed, indent=4)

with open(str(latest_block)+"_transactions.json", "w") as outfile:
    outfile.write(indented_JSON)
    
print("done")
