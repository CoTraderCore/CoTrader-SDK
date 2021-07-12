require('dotenv').config()
const getOneInchData = require("./utils/getOneInchData")

async function test() {
   console.log(await getOneInchData(
     "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
     "0x0000000000004946c0e9f43f4dee607b0ef1fa1c",
     "10000000000000000",
     "0x0000000000004946c0e9f43f4dee607b0ef1fa1c"
   ))
}

test()
