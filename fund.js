// TODO: add deposit, withdraw methods

require('dotenv').config()
const { Trade } = require('./methods')

class Fund {
  constructor(key, rpc, netID, fundAddress){
    if(!key){
      console.log("Please provide fund admin key")
      return
    }

    if(!rpc){
      console.log("Please provide rpc provider")
      return
    }

    if(!netID){
      console.log("Please pass netID, available 1 eth, 56 bnb, 137 matic, 8453 base")
      return
    }
    this.fundAddress = fundAddress
    this.netID = netID 
    this.key = key
    this.rpc = rpc
  }

  trade = async (fromToken, toToken, amount, minReturn) => {
    return await Trade(
      process.env.KEY,
      this.fundAddress,
      amount,
      fromToken,
      toToken,
      minReturn,
      this.netID,
      this.key,
      this.rpc
    )
  }
}

module.exports = Fund
