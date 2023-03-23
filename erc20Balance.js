const { ethers } = require("ethers");
require('dotenv').config();

const wallet_address = '0xb0145a859b151d986bc2ee0f1869fc188231c437'
const usdc_address = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

async function getERC20Balance(wallet_address, erc20_address) {
    const endpoint = {
        url: process.env.endpoint,
        user: process.env.username,
        password: process.env.password
    }
    let contractABI = [
        // Read-Only Functions
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",

        // Authenticated Functions
        "function transfer(address to, uint amount) returns (bool)",

        // Events
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];


    const provider = new ethers.providers.JsonRpcProvider(endpoint, 'homestead');
    let contract = new ethers.Contract(erc20_address, contractABI, provider);
    let balance = await contract.balanceOf(wallet_address);
    let decimals = await contract.decimals();
    let symbol = await contract.symbol();
    console.log("This wallet:",wallet_address, "has", ethers.utils.formatUnits(balance, decimals), symbol);

}

getERC20Balance(wallet_address, usdc_address)

