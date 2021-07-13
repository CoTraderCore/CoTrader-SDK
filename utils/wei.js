const BigNumber = require('bignumber.js')
const Web3Utils = require('web3-utils')
const { TOKEN_ABI } = require('../abi')

const ETH_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'


const toWeiByDecimalsInput = (decimals, amount) => {
  if(amount === 0)
    return 0

    const factor = 10 ** decimals
    amount = new BigNumber(amount)
    amount = amount.multipliedBy(factor)
    // for avoid e+ or e- scientific notation or decimals
    return BigNumber(BigNumber(amount).integerValue()).toString(10)
}

const fromWeiByDecimalsInput = (decimals, amount) => {
   if(amount === 0)
     return 0

     const factor = 10 ** decimals
     amount = new BigNumber(amount)
     amount = amount.dividedBy(factor)
     // for avoid e+ or e- scientific notation or decimals
     return String(amount.toPrecision())
}

// convert token to wei by decimals
const toWeiByDecimalsDetect = async (tokenAddress, tokenInput, web3) => {
   let amount = 0
   // ERC20 case
   if(String(tokenAddress).toLowerCase() !== String(ETH_TOKEN_ADDRESS).toLowerCase()){
     // get cur token instance
     const token = new web3.eth.Contract(
       TOKEN_ABI,
       tokenAddress
     )
     // get cur amount in wei by decimals
     amount = toWeiByDecimalsInput(
     await token.methods.decimals().call(),
     tokenInput
     )
   }
   // ETH case
   else{
     amount = Web3Utils.toWei(String(tokenInput))
   }

   return amount
}


const fromWeiByDecimalsDetect = async (tokenAddress, tokenInput, web3) => {
   let amount = 0
   // ERC20 case
   if(String(tokenAddress).toLowerCase() !== String(ETH_TOKEN_ADDRESS).toLowerCase()){
     // get cur token instance
     const token = new web3.eth.Contract(
       TOKEN_ABI,
       tokenAddress
     )
     // get cur amount in wei by decimals
     amount = fromWeiByDecimalsInput(
     await token.methods.decimals().call(),
     tokenInput
     )
   }
   // ETH case
   else{
     amount = Web3Utils.fromWei(String(tokenInput))
   }

   return amount
}

module.exports = {
  toWeiByDecimalsInput,
  fromWeiByDecimalsInput,
  toWeiByDecimalsDetect,
  fromWeiByDecimalsDetect
}
