// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
require("dotenv").config()

async function main() {

  const signer = await ethers.getSigner()
  const LiquidityRouter = await ethers.getContractFactory("SushiswapLiquidityRouter")
  const lr = await LiquidityRouter.attach("0xB46c7164e7EEe4D3aC8147bbCe9B7fCB319601cd")

  await lr.deposit(
    "996",
    "1000",
    "991",
    "995"
  ).then( async (tx) => {
    const events = (await tx.wait()).events
    console.log(events[0].topics)
  })

  await lr.withdraw(
    "996",
    "1000",
    "991"
  ).then( async (tx) => {
    const events = (await tx.wait()).events
    console.log(events[0].topics)
  })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
