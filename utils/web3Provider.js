require('dotenv').config()
const Web3 = require('web3')

const web3Provider = () => {
  const provider = process.env.WEB3_NODE
  return new Web3(provider)
}

module.exports = web3Provider
