const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {

  networks: {

    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    //  NOTE: This is the setup for deploying the contracts to the Rinkeby testNet:
      //  truffle migrate --network rinkeby
    rinkeby: {
      provider: () => {
          return new HDWalletProvider(
              //TODO replace with projects 12 word seed phrase
              "fatigue fame muffin glide discover genius account tell manage witness start dial",
              "https://rinkeby.infura.io/v3/b9215400bd884ce9916a3749d584ec3b"
          );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    useColors: true,
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.4.25",    // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       }
      }
    }
  }
}
