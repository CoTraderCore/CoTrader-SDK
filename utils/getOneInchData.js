const axios = require("axios")

module.exports = async (sendFrom, sendTo, amount, exchangePortalAddress) => {
  let additionalData = "0x"

  try{
    const route = `swap?fromTokenAddress=${sendFrom}&toTokenAddress=${sendTo}&amount=${amount}&fromAddress=${exchangePortalAddress}&slippage=1&disableEstimate=true`
    const response = await axios.get('https://api.1inch.exchange/v3.0/56/' + route)
    additionalData = response.data.tx.data
  }
  catch(e){
    console.log("1inch error ", e)
  }

  return additionalData
}
