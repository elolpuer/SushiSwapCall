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
  const lr = await LiquidityRouter.attach("0xCc82082B94fE3f1Cc22F3e4a7145d505d8732177")

  console.log("Deposit...")
  await lr.deposit(
    "100000000000000000000000000",  //amountADesired
    "440874309984", //amountBDesired
    "99500000000000000000000000",  //amountAMin
    "438669938434"   //amountBMin
  ).then( async (tx) => {
    await tx.wait()
    console.log("Done")
  })

  console.log("Withdraw...")
  await lr.withdraw(
    (await lr.userBalance(signer.address)).toString(),
    "10000000000000000000000000",
    "43866993843"
  ).then( async (tx) => {
    await tx.wait()
    console.log("Done")
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
