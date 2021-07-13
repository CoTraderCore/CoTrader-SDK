require('dotenv').config()
const Fund = require('./fund')

// fund params
const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'
const privateKey = process.env.KEY
const dexType = 0 // 1inch

// create fund instance
const fund = new Fund(privateKey, fundAddress, dexType)

// define some tokens
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

// Run your code here
async function app() {
  // test trade from eth to token
  const hash = await fund.tradeFromETH(BUSD, "0.0001", 1)
  console.log(`Success hash ${hash}`)
}

app()
