require('dotenv').config()
const Web3 = require('web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const web3Provider = (KEY, WEB3_NODE) => {
  const provider = new HDWalletProvider(KEY, WEB3_NODE)
  return new Web3(provider)
}

module.exports = web3Provider
