const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { convertUSDC, convertUSDT } = require("./utils/convert.js");
const { ethers } = require("ethers")
require("dotenv").config()

const {
  depositTopic,
  withdrawTopic
} = require("./utils/constants.js")
const {
  read
} = require("./utils/workWithFile.js")


const contractAddress = '0xcC74FD1D507fd1D718CFA5935EDb826Ce0A65338';

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
    `wss://polygon-mainnet.g.alchemy.com/v2/${[process.env.API_KEY]}`
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
console.log("Start listen address: ", contractAddress)
// Open the websocket and listen for events
web3.eth.subscribe("logs", depositEvents).on("data", writeDeposit);
web3.eth.subscribe("logs", withdrawEvents).on("data", writeWithdraw);
