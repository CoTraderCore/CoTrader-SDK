require('dotenv').config()
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const provider = new HDWalletProvider(process.env.KEY, process.env.WEB3_NODE)

const web3Provider = () => {
  return new Web3(provider)
}

module.exports = web3Provider
