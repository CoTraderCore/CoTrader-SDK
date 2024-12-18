const TradeMethods = (netId, dexType) => {
  // Define the methods for each netId
  let methods;
  
  if (netId === 1) {
    methods = [{"UNI-V2": 2}]; // uni v2 eth
  } else if (netId === 56) {
    methods = [{"UNI-V2": 2}]; // pancake
  } else if (netId === 137) {
    methods = [{"UNI-V2": 1}]; // quick swap
  } else if (netId === 8453) {
    methods = [{"UNI-V2": 4}, {"WHALEX": 5}]; // uni v2 base
  } else {
    return 0; // invalid netId
  }

  // Check if the dexType exists in the methods and return the corresponding value
  let found = false;
  for (let method of methods) {
    if (method[dexType]) {
      found = true;
      return method[dexType]; // Return the number associated with the dexType
    }
  }

  // If dexType is not found, print error and exit
  if (!found) {
    console.error("Invalid dexType");
    process.exit(1); // Exit the process with a failure status code
  }
};


module.exports = TradeMethods