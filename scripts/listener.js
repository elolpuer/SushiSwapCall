// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
require("dotenv").config()
// 
// async function main() {

  // const signer = await ethers.getSigner()
  // const LiquidityRouter = await ethers.getContractFactory("SushiswapLiquidityRouter")
  // const lr = await LiquidityRouter.attach("0xB46c7164e7EEe4D3aC8147bbCe9B7fCB319601cd")
  //
  // const url = "https://eth-rinkeby.alchemyapi.io/v2/" + [process.env.API_KEY];
  //
  // const provider = new ethers.providers.WebSocketProvider(url)
  //
  // lr.on('Deposit', (sender, amountA, amountB, liquidity) => console.log(sender, amountA, amountB, liquidity))

  const depositTopic = "0x36af321ec8d3c75236829c5317affd40ddb308863a1236d2d277a4025cccee1e";
  const withdrawTopic = "0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568";
  const contractAddress = "0xB46c7164e7EEe4D3aC8147bbCe9B7fCB319601cd";

  // Create the log options object.
  const depositEvents = {
      address: contractAddress,
      topics: [depositTopic]
  }

  const withdrawEvents = {
      address: contractAddress,
      topics: [withdrawTopic]
  }

  const web3 = createAlchemyWeb3(
      `wss://eth-rinkeby.alchemyapi.io/v2/${[process.env.API_KEY]}`
  );

  // TODO: Add whatever logic you want to run upon mint events.
  const doSomethingWithTxn = (txn) => console.log(txn);

  // Open the websocket and listen for events!
  web3.eth.subscribe("logs", depositEvents).on("data", doSomethingWithTxn);
  web3.eth.subscribe("logs", withdrawEvents).on("data", doSomethingWithTxn);
