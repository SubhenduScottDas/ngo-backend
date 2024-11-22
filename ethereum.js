const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.MAINNET_URL);

// Use the private key from the environment variable to create a wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract ABI and address (from your compiled smart contract)
const contractABI = require('./contract/CharityDonation.json'); // Path to your ABI file
const contractAddress = process.env.CONTRACT_ADDRESS;

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

module.exports = contract;
