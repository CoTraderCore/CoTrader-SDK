require('dotenv').config()

// import fund class
const Fund = require('./fund')

// put your code inside this function
async function app() {
  // define fund params
  const fundAddress = '0x3Ca7Ae3E7bd69546429BD86766A7681a47FBF7d0'

// create fund instance
const fund = new Fund(fundAddress)

// // define some tokens addresses
// const BUSD = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
// const ETH = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'  // ETH or BNB we recognize by this address

//   // tx trade from bnb to busd token
//   const status = await fund.trade(
//     ETH,
//     BUSD,
//     "0.00001", // ETH(BNB) amount
//     1 // Min return just 1 wei for test
//   )
//   // log info
//   console.log(`tx status ${status}`)
}

// run
app()
