
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url:"https://eth-goerli.g.alchemy.com/v2/BWiaDNfmJKQ6FIy2PdAMqUzY48ShjLSM",
      accounts: [ "ad08438643444636bf317ef0b223920d23fadfcb9f126d441258a61f45b5727e" ]
    }

  }
}