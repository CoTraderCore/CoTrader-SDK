// helper for test

require('dotenv').config()
const privateKeyToAccount = require("./utils/privateKeyToAccount")

console.log(privateKeyToAccount(process.env.KEY))
