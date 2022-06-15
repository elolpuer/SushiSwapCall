const { ethers } = require("ethers")
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/")
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const addrUSDT = "0x0A6513e40db6EB1b165753AD52E80663aeA50545" //USDT/USD
const addrUSDC = "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7" //USDC/USD
const priceFeedUSDT = new ethers.Contract(addrUSDT, aggregatorV3InterfaceABI, provider)
const priceFeedUSDC = new ethers.Contract(addrUSDC, aggregatorV3InterfaceABI, provider)
async function convertUSDT(amount) {
  return priceFeedUSDT.latestRoundData()
      .then((roundData) => {
          return (amount * 10**(-6) * parseInt(roundData.answer) * 10**(-8))
      })
}

async function convertUSDC(amount) {
  return priceFeedUSDC.latestRoundData()
      .then((roundData) => {
          return (amount * 10**(-6) * parseInt(roundData.answer) * 10**(-8))
      })
}

module.exports = {
  convertUSDC,
  convertUSDT
}
