require('dotenv').config()

// import fund class
const Fund = require('./fund')

// define fund params
const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'
const privateKey = process.env.KEY
const dexType = 0 // 1inch

// create fund instance
const fund = new Fund(privateKey, fundAddress, dexType)

// define some tokens addresses
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
const ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'  // ETH or BNB recognize by this address

// put your code inside this function
async function app() {
  // tx1 trade from bnb to busd token
  const status1 = await fund.tradeFromETH(
    BUSD,
    "0.0001", // BNB amount
    1 // Min return just 1 wei for test
  )
  // log info
  console.log(`tx1 status ${status1}`)

  // tx2 trade from busd to bnb token
  const status2 = await fund.tradeFromToken(
    BUSD,
    ETH,
    "0.0001", // BUSD amount
    1 // Min return just 1 wei for test
  )
  // log info
  console.log(`tx2 status ${status2}`)
}

// run
app()
