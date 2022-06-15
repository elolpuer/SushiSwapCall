const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { convertUSDC, convertUSDT } = require("./utils/convert.js");
const { ethers } = require("ethers")

require("dotenv").config()

const depositTopic = "0x90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15";
const withdrawTopic = "0xf279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568";
const contractAddress = "0x75eE601473Ba2C40faC366ca5033754e4C84719f";

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

const writeDeposit = async (txn) => {
  const data = txn.data
  const parsedData = ethers.utils.defaultAbiCoder.decode(["address", "uint", "uint"], data)
  const tokenAInUSD = await convertUSDC(parsedData[1])
  const tokenBInUSD = await convertUSDT(parsedData[2])
  console.log(
    `Deposit:
    --sender: ${parsedData[0]}
    --tokenA: ${tokenAInUSD} USD
    --tokenB: ${tokenBInUSD} USD
    --transactionHash: ${txn.transactionHash}
    `
  )
}

const writeWithdraw = async (txn) => {
  const data = txn.data
  const parsedData = ethers.utils.defaultAbiCoder.decode(["address", "uint", "uint"], data)
  const tokenAInUSD = await convertUSDC(parsedData[1])
  const tokenBInUSD = await convertUSDT(parsedData[2])
  console.log(
    `Withdraw:
    --sender: ${parsedData[0]}
    --tokenA: ${tokenAInUSD} USD
    --tokenB: ${tokenBInUSD} USD
    --transactionHash: ${txn.transactionHash}
    `
  )
}

// Open the websocket and listen for events
web3.eth.subscribe("logs", depositEvents).on("data", writeDeposit);
web3.eth.subscribe("logs", withdrawEvents).on("data", writeWithdraw);
