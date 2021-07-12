require('dotenv').config()
const getMerkleTreeData = require("./utils/getMerkleTreeData")

const { proof, positions } = getMerkleTreeData("0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c")
console.log(proof, positions)
