// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {

  const signer = await ethers.getSigner()
  const LiquidityRouter = await ethers.getContractFactory("SushiswapLiquidityRouter")
  const lr = await LiquidityRouter.deploy(
    '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506', //router
    '0x4B1F1e2435A9C96f7330FAea190Ef6A7C8D70001', //pair
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',  //usdc
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', //usdt
  )
  await lr.deployed()
  // const lr = await LiquidityRouter.attach("0xc19EFf8356630831eaC5cba638E45A704e8fcc4d")

  console.log("Router deployed on address: ", lr.address)

  console.log(
    "Balance LP before",
    await lr.userBalance(signer.address)
  )

  console.log("Deposit...")

  await lr.deposit(
    "996",
    "1000",
    "991",
    "995"
  ).then( async (tx) => {
      const events = (await tx.wait()).events
      console.log(events)
      // const BurnEvent = events[events.length - 1]
      // const sender = BurnEvent.args.sender
      // const amount = BurnEvent.args.amount
      // await wqdt.mint(sender, amount)
      // console.log("QDT after bridge", await qdt.balanceOf(signers[0].address))
      // console.log("WrappedQDT after bridge", await wqdt.balanceOf(signers[0].address))
    })

  console.log(
    "Balance LP after",
    await lr.userBalance(signer.address)
  )

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
