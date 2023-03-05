require('dotenv').config();

const snowtraceApiKey = process.env.INFURA_AVAX_API_KEY;

module.exports = {
  // truffle dashboard run truffle migrate --network dashboard
  dashboard: {
    port: 24012,
  },
  
  plugins: ["truffle-plugin-verify"],
    api_keys: {
      snowtrace: snowtraceApiKey,
    },

  networks: {
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    goerli: {
      network_id: 5,       // Goerli's id
      chain_id: 5
    },

    avalancheFuji: {
      network_id: 5,       // avalancheFuji's id
      chain_id: 43113
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin
    }
  }
};
