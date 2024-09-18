// TODO: add deposit, withdraw methods

require('dotenv').config()
const { Trade } = require('./methods')

class Fund {
  constructor(fundAddress){
    if(!process.env.KEY){
      console.log("Please settup KEY in .env file")
      return
    }

    if(!process.env.WEB3_NODE){
      console.log("Please settup WEB3_NODE (rpc provider) in .env file")
      return
    }

    if(!process.env.CHAINID){
      console.log("Please settup CHAINID in .env file, available 1 eth, 56 bnb, 137 matic, 8453 base")
      return
    }
    this.fundAddress = fundAddress
  }

  trade = async (fromToken, toToken, amount, minReturn) => {
    return await Trade(
      process.env.KEY,
      this.fundAddress,
      amount,
      fromToken,
      toToken,
      minReturn,
      this.dexType
    )
  }
}

module.exports = Fund
