require('dotenv').config()

const { ETH_FUND_ABI } = require("../abi")
const web3 = require("../utils/web3Provider")()
const privateKeyToAccount = require("../utils/privateKeyToAccount")
const getMerkleTreeData = require("../utils/getMerkleTreeData")
const getOneInchData = require("../utils/getOneInchData")
const wei = require("../utils/wei")

const createTx = async (key, fundAddress, amount, fromToken, toToken, minReturn, dexType) => {
  const amountInWei = await wei.toWeiByDecimalsDetect(fromToken, String(amount), web3)
  const from = privateKeyToAccount(key)
  const contract = new web3.eth.Contract(ETH_FUND_ABI, fundAddress)
  const {
    proof,
    positions
  } = getMerkleTreeData(toToken)

  let additionalData = "0x"

  // 1 inch case
  if(dexType === 0 && process.env.CHAINID === 56){
    const exchangePortal = await contract.methods.exchangePortal().call()
    additionalData = await getOneInchData(fromToken, toToken, amountInWei, exchangePortal)
  }

  const data = contract.methods.trade(
    fromToken,
    amountInWei,
    toToken,
    dexType,
    proof,
    positions,
    additionalData,
    minReturn
  ).encodeABI({from})

  const nonce = await web3.eth.getTransactionCount(from)

  const tx = {
    from,
    to: fundAddress,
    value: 0,
    data,
    "gasPrice": process.env.GASPRICE,
    "gas": process.env.GAS,
    "chainId": process.env.CHAINID,
    nonce: nonce
  }

  return tx
}

module.exports = async (key, fundAddress, amount, fromToken, toToken, minReturn, dexType) => {
  const tx = await createTx(key, fundAddress, amount, toToken, minReturn, dexType)
  const signed  = await web3.eth.accounts.signTransaction(tx, key, false)
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)

  return receipt.transactionHash
}
