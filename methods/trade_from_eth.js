require('dotenv').config()

const { ETH_FUND_ABI } = require("../abi")
const web3 = require("../utils/web3Provider")()
const privateKeyToAccount = require("../utils/privateKeyToAccount")
const getMerkleTreeData = require("../utils/getMerkleTreeData")
const getOneInchData = require("../utils/getOneInchData")
const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

const createTx = async (key, fundAddress, amount, toToken, minReturn, dexType) => {
  const amountInWei = web3.utils.toWei(amount)
  const from = privateKeyToAccount(key)
  const contract = new web3.eth.Contract(ETH_FUND_ABI, fundAddress)
  const {
    proof,
    positions
  } = getMerkleTreeData(toToken)

  let additionalData = "0x"

  // 1 inch case
  if(dexType === 0){
    const exchangePortal = await contract.methods.exchangePortal().call()
    additionalData = await getOneInchData(ETH_ADDRESS, toToken, amountInWei, exchangePortal)
  }

  const data = contract.methods.trade(
    ETH_ADDRESS,
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
    value: amountInWei,
    data,
    "gasPrice": process.env.GASPRICE,
    "gas": process.env.GAS,
    "chainId": process.env.CHAINID,
    nonce: nonce
  }

  return tx
}

module.exports = async (key, fundAddress, amount, toToken, minReturn, dexType) => {
  const tx = await createTx(key, fundAddress, amount, toToken, minReturn, dexType)
  const signed  = await web3.eth.accounts.signTransaction(tx, key)
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)

  return receipt.transactionHash
}
