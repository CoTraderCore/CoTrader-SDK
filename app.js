require('dotenv').config()
const Fund = require('./fund')

// fund params
const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'
const privateKey = process.env.KEY
const dexType = 0 // 1inch

// create fund instance
const fund = new Fund(privateKey, fundAddress, dexType)

// Run your code here
async function app() {
  const toToken = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c' 
  // test trade from eth to token
  const hash = await fund.tradeFromETH(toToken, "0.0001", 1)
  console.log(`Success hash ${hash}`)
}

app()
