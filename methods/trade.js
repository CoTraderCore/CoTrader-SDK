require('dotenv').config()

const { ETH_FUND_ABI } = require("../abi")
const web3 = require("../utils/web3Provider")()
const getMerkleTreeData = require("../utils/getMerkleTreeData")
const getOneInchData = require("../utils/getOneInchData")
const wei = require("../utils/wei")

module.exports = async (key, fundAddress, amount, fromToken, toToken, minReturn, dexType) => {
  const amountInWei = await wei.toWeiByDecimalsDetect(fromToken, String(amount), web3)
  const accounts = await web3.eth.getAccounts()
  const from = accounts[0]
  const contract = new web3.eth.Contract(ETH_FUND_ABI, fundAddress)
  const {
    proof,
    positions
  } = getMerkleTreeData(toToken)

  let additionalData = "0x"

  // 1 inch case
  if(dexType === 0){
    const exchangePortal = await contract.methods.exchangePortal().call()
    additionalData = await getOneInchData(fromToken, toToken, amountInWei, exchangePortal)
  }

  let status = false
  try{
    await contract.methods.trade(
      fromToken,
      amountInWei,
      toToken,
      dexType,
      proof,
      positions,
      additionalData,
      minReturn
    ).send({ from })

    status = true
  }catch(e){
    console.log("Trade error : ", e)
  }

  return status
}
