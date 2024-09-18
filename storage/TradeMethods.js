const TradeMethods = (netId) => {
    if(netId = 1){
      return 2 // uni v2 eth
    }
    else if(netId = 56){
      return 2 // pancake
    }
    else if(netId = 137){
      return 1 // quick swap
    }
    else if(netId = 8453){
      return 4 // uni v2 base
    }
    else {
      return 0
    }
}

module.exports = TradeMethods