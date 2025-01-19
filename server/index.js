const { ethers } = require("ethers");  // or import { ethers } from "ethers";
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// read from .env, etc.
const RPC_URL = process.env.RPC_URL;
const WIKI_CONTRACT_ADDRESS = process.env.WIKI_CONTRACT_ADDRESS;

const app = express();
app.use(express.json());
app.use(cors());

// **Ethers v6**: provider is constructed like this:
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Example: if you need a signer with a known private key
// (like from Hardhat local node's accounts, or .env)
const PRIVATE_KEY = process.env.PRIVATE_KEY; // if you have it
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// or if you want an anonymous Signer, you can do:
//// const wallet = provider.getSigner(); // This doesn't exist in plain Ethers v6. 
//// For a local Hardhat node, you'd normally specify a private key or use Hardhat's plugin approach.

// If you have the ABI in a separate file:
const wikiAbi = [
  // your contract's ABI
];

// Now create contract instance with Ethers v6
const wikiContract = new ethers.Contract(WIKI_CONTRACT_ADDRESS, wikiAbi, wallet);

// then define your endpoints:
app.get('/page/:title', async (req, res) => {
  // ...
});

app.post('/page', async (req, res) => {
  // ...
});

// start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
