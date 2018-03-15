require('dotenv').config()

const Provider = require('truffle-privatekey-provider')

const privateKey = process.env.PRIVATE_KEY

const engineRopsten = () =>
  new Provider(privateKey, 'https://ropsten.infura.io/yjqnTtPRQ0VNfO2jx81m')

const {
  name: packageName,
  version,
  description,
  keywords,
  license,
  author,
  contributors
} = require('./package.json')

const DEFAULT = {
  host: 'localhost',
  port: 8545,
  network_id: '*', // Match any network id
  gas: 4600000
}

module.exports = {
  packageName,
  version,
  description,
  keywords,
  license,
  authors: [author, ...contributors],
  networks: {
    geth: { ...DEFAULT, gas: 999999 },
    ropsten: {
      network_id: 3,
      provider: engineRopsten,
      gas: 4700000,
      gasPrice: 222000000000
    }
    // mainnet: {
    //   network_id: 1,
    //   provider: engineMainnet,
    //   from: addresses[0],
    //   gas: 5000000,
    //   gasPrice: 75000000000
    // }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
