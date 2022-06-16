// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
require("dotenv").config()
const {
  usdcAddress,
  usdtAddress,
  pairAddress,
  routerAddress
} = require("./utils/constants.js")

async function main() {

  const signer = await ethers.getSigner()
  const LiquidityRouter = await ethers.getContractFactory("SushiswapLiquidityRouter")
  console.log("Deploying LiquidityRouter")
  const lr = await LiquidityRouter.deploy(
    routerAddress, //router
    pairAddress, //pair
    usdcAddress,  //usdc
    usdtAddress, //usdt
  )
  await lr.deployed()
  console.log(lr.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
