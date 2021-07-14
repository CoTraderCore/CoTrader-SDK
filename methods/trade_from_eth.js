require('dotenv').config()

const { ETH_FUND_ABI } = require("../abi")
const web3 = require("../utils/web3Provider")()
const getMerkleTreeData = require("../utils/getMerkleTreeData")
const getOneInchData = require("../utils/getOneInchData")
const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'



module.exports = async (key, fundAddress, amount, toToken, minReturn, dexType) => {
  // get fund contract instance
  const contract = new web3.eth.Contract(ETH_FUND_ABI, fundAddress)

  // convert ETH input to wei
  const amountInWei = web3.utils.toWei(amount)

  // get from address
  const accounts = await web3.eth.getAccounts()
  const from = accounts[0]

  // get merkle three data
  const {
    proof,
    positions
  } = getMerkleTreeData(toToken)

  // get additional data (require for 1 inch case)
  let additionalData = "0x"
  // 1 inch case
  if(dexType === 0){
    const exchangePortal = await contract.methods.exchangePortal().call()
    additionalData = await getOneInchData(ETH_ADDRESS, toToken, amountInWei, exchangePortal)
  }

  let status = false
  try{
    // tx
    await contract.methods.trade(
      ETH_ADDRESS,
      amountInWei,
      toToken,
      dexType,
      proof,
      positions,
      additionalData,
      minReturn
    ).send({ from, "gasPrice": process.env.GASPRICE, "gas": process.env.GAS })
    status = true
  }catch(e){
    console.log("Trade from ETH error : ",e)
  }

  return status
}
