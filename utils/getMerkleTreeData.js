const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const WhiteListedTokens = require('../storage/WhiteListedTokens')
require('dotenv').config()

const buf2hex = x => '0x'+x.toString('hex')
const WL = WhiteListedTokens(proces.env.CHAINID)
const leaves = WL.map(x => keccak256(x)).sort(Buffer.compare)
const tree = new MerkleTree(leaves, keccak256)
// const root = buf2hex(tree.getRoot())

const getMerkleTreeData = (tokenAddress) => {
  // const leaf = buf2hex(keccak256(tokenAddress))
  const proof = tree.getProof(keccak256(tokenAddress)).map(x => buf2hex(x.data))
  const positions = tree.getProof(keccak256(tokenAddress)).map(x => x.position === 'right' ? 1 : 0)

  return { proof, positions }
}

module.exports = getMerkleTreeData
