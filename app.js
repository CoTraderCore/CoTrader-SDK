require('dotenv').config()

// import fund class
const Fund = require('./fund')

// define fund params
const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'
const key = process.env.KEY 
const rpc = process.env.WEB3_NODE
const netID = 56 // available 1 - eth, 56 - bnb, 137 - matic, 8453 - base
const TradeMethods = require('./storage/TradeMethods')
// create fund instance
const fund = new Fund(key, rpc, netID, fundAddress)

const dex = "WHALEX" // Available "UNI-V2 for all, WHALEX for some"
const dexType = TradeMethods(netID, dex)

// define some tokens addresses
const ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'  // ETH, BASE, BNB or MATIC we recognize by this address
const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

// example execute trade from script
async function app() {
  // call tx trade from bnb to busd token
  const status = await fund.trade(
    ETH,
    BUSD,
    "0.00001", // amount of BNB for swap
    1, // Min return just 1 wei for test, you can define here min return you need
    dexType
  )
  // log info
  console.log(`tx status ${status}`)
}

// run
app()
