require('dotenv').config()
const Fund = require('./fund')

// fund params
const fundAddress = '0xf751C54CB3e9bDB07875F373dbDc44999822e33F'
const privateKey = process.env.KEY
const dexType = 0 // 1inch

// create fund instance
const fund = new Fund(privateKey, fundAddress, dexType)

// Run your code here
async function app() {
  const toToken = '0x304fC73e86601a61a6C6db5B0eAfEA587622acdC' // bCOT
  // test trade from eth to token
  const hash = await fund.tradeFromETH(toToken, "0.0001", 1)
  console.log(`Success hash ${hash}`)
}

app()
