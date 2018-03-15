const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

module.exports = (deployer, network) => {
  if (network === 'ropsten') {
    deployer.deploy(BattleshipsV1)
  }
}
