// TODO: add deposit, withdraw methods

const { Trade } = require('./methods')

class Fund {
  constructor(key, fundAddress, dexType){
    this.key = key
    this.fundAddress = fundAddress
    this.dexType = dexType
  }

  trade = async (fromToken, toToken, amount, minReturn) => {
    return await Trade(
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
