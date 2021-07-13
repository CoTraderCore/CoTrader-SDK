require('dotenv').config()

// import fund class
const Fund = require('./fund')

// define fund params
const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'
const privateKey = process.env.KEY
const dexType = 0 // 1inch

// create fund instance
const fund = new Fund(privateKey, fundAddress, dexType)


// put your code inside this function
async function app() {
  // test trade from bnb to busd token
  const hash = await fund.tradeFromETH(
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // BUSD token address
    "0.0001", // BNB amount
    1 // Min return just 1 wei for tests
  )
  // log info
  console.log(`Success hash ${hash}`)
}

// run
app()
