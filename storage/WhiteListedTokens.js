const ETHWLTokens = require('./ETHWLTokens')
const BNBWLTokens = require('./BNBWLTokens')
const MATICWLTokens = require('./MATICWLTokens')
const BASETokens = require('./BASETokens')


const WhiteListedTokens = (netId) => {
    if(netId = 1){
      return ETHWLTokens
    }
    else if(netId = 56){
      return BNBWLTokens
    }
    else if(netId = 137){
      return MATICWLTokens
    }
    else if(netId = 8453){
      return BASETokens
    }
    else {
      return []
    }
}

module.exports = WhiteListedTokens