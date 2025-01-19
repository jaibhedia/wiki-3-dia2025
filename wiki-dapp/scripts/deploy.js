// scripts/deploy.js (CommonJS)

const hre = require("hardhat");

async function main() {
  // "hre.ethers" is the plugin-enabled ethers, automatically configured
  const Wiki = await hre.ethers.getContractFactory("Wiki");
  const wiki = await Wiki.deploy();
  await wiki.deployed();

  console.log("Wiki contract deployed to:", wiki.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
