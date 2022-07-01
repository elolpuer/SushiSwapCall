require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      network_id: 4,
      accounts: [process.env.PRIVATE_KEY]
    },
    development: {
      url: "http://127.0.0.1:7545",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // localhost: {
    //   gas: 21000000,
    //   gasPrice: 8
    // }
  },
  etherscan: {
    apiKey: process.env.SCAN_API_KEY,
  },
  solidity: "0.8.13",
};
