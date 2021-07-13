const { TradeFromETH, TradeFromERC } = require('./methods')

class Fund {
  constructor(key, fundAddress, dexType){
    this.key = key
    this.fundAddress = fundAddress
    this.dexType = dexType
  }

  tradeFromETH = async (toToken, amount, minReturn) =>{
    return await TradeFromETH(
      this.key,
      this.fundAddress,
      amount,
      toToken,
      minReturn,
      this.dexType
    )
  }

  tradeFromToken = async (fromToken, toToken, amount, minReturn) => {
    return await TradeFromERC(
      this.key,
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
