require('dotenv').config()

const { ETH_FUND_ABI } = require("../ABI")
const web3 = require("../utils/web3Provider")()
const privateKeyToAccount = require("../utils/privateKeyToAccount")

const createTx = async (key, fundAddress, amount, toToken, minReturn) => {
  const from = privateKeyToAccount(key)
  const contract = new web3.eth.Contract(ETH_FUND_ABI, fundAddress)
  const {
    proof,
    positions
  } = getMerkleTreeData(toToken)

  const data = contract.methods.trade(
    minReturn,
    [ADDRESS.WETH, ADDRESS.UNDERLYING_TOKEN],
    from,
    "111111111111111111"
  ).encodeABI({from})

  const nonce = await web3.eth.getTransactionCount(from)

  const tx = {
    from,
    to: fundAddress,
    value: amount,
    data,
    "gasPrice": process.env.GASPRICE,
    "gas": process.env.GAS,
    "chainId": process.env.CHAINID,
    nonce: nonce
  }

  return tx
}

module.exports = async (key, fundAddress, amount, toToken, minReturn) => {
  const tx = await createTx(key, fundAddress, amount, toToken, minReturn)
  const signed  = await web3.eth.accounts.signTransaction(tx, key, false)
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)

  return receipt.transactionHash
}
