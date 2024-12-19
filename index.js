// TODO: add deposit, withdraw methods

require('dotenv').config()
const { Trade } = require('./methods')
const TradeMethods = require('./storage/TradeMethods')

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

  trade = async (fromToken, toToken, amount, minReturn, dex) => {
    const dexType = TradeMethods(netID, dex)

    return await Trade(
      process.env.KEY,
      this.fundAddress,
      amount,
      fromToken,
      toToken,
      minReturn,
      this.key,
      this.rpc,
      dexType
    )
  }
}

module.exports = Fund
