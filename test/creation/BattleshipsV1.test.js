const { expect } = require('chai')
const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

const Zero = require('../utils/zero')

// const checkShipsNotPlaced = require('../utils/checkShipsNotPlaced')

contract('BattleshipsV1 Creation', ([player, opponent]) => {
  let battleships

  before(async () => {
    battleships = await BattleshipsV1.new()
  })

  it('was created successfully', () => {
    expect(battleships).to.exist
  })

  it('player has no opponent', async () => {
    expect(await battleships.getOpponent()).to.equal(Zero.address)
  })

  it('opponent has no opponent', async () => {
    expect(await battleships.getOpponent({ from: opponent })).to.equal(
      Zero.address
    )
  })

  it('whoseTurn returns 0x0', async () => {
    expect(await battleships.whoseTurn()).to.equal(Zero.address)
  })

  it('isGameOver returns false', async () => {
    expect(await battleships.isGameOver()).to.be.false
  })

  it('getGameState returns 0', async () => {
    expect((await battleships.getGameState()).toNumber()).to.equal(0)
  })
})
