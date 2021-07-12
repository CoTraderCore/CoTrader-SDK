module.exports = (key) => {
  const data = web3.eth.accounts.privateKeyToAccount(key)
  return data.address
}
