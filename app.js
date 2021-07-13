require('dotenv').config()
const privateKeyToAccount = require("./utils/privateKeyToAccount")
const fundAddress = '0xf751C54CB3e9bDB07875F373dbDc44999822e33F'
const userAddress = "0xf1d01163ccAc6D884f770B3251944dE551944680"
const toToken = '0xd3b6933a448ff602711390f96e15c0b9cab5ff11' // COT
const { TradeFromETH } = require('./methods')

async function test() {
   const hash = await TradeFromETH(process.env.KEY, fundAddress, "0.001", toToken, 1, 0)
   console.log(hash)
}

test()
