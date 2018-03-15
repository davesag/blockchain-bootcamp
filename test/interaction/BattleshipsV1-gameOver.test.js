const { expect } = require('chai')
const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

const Zero = require('../utils/zero')
const { getLog } = require('../utils/txHelpers')
const assertThrows = require('../utils/assertThrows')
// const checkShipsNotPlaced = require('../utils/checkShipsNotPlaced')

contract('BattleshipsV1 game over', ([player, opponent]) => {
  let battleships
  let tx
  const x = 3
  const y = 3
  const ship = 3
  const direction = 0

  before(async () => {
    battleships = await BattleshipsV1.new()
    tx = await battleships.startGame(opponent)

    // Placing all the ships
    /*
    Player 1
    T____FDB
    FF___FDB
    DDD___DB
    BBBB___B
    CCCCC___
    CCCCC___
    ________
    ________

    Player 2
    _____BDF
    _____BDF
    T____BD_
    FF___B__
    DDD_____
    BBBB____
    CCCCC___
    CCCCC___
    */
    tx = await battleships.placeShip(0, 0, 1, 1)
    tx = await battleships.placeShip(0, 1, 2, 1)
    tx = await battleships.placeShip(0, 2, 3, 1)
    tx = await battleships.placeShip(0, 3, 4, 1)
    tx = await battleships.placeShip(0, 4, 5, 1)
    tx = await battleships.placeShip(5, 0, 2, 0)
    tx = await battleships.placeShip(6, 0, 3, 0)
    tx = await battleships.placeShip(7, 0, 4, 0)

    tx = await battleships.placeShip(0, 2, 1, 1, { from: opponent })
    tx = await battleships.placeShip(0, 3, 2, 1, { from: opponent })
    tx = await battleships.placeShip(0, 4, 3, 1, { from: opponent })
    tx = await battleships.placeShip(0, 5, 4, 1, { from: opponent })
    tx = await battleships.placeShip(0, 6, 5, 1, { from: opponent })
    tx = await battleships.placeShip(5, 0, 4, 0, { from: opponent })
    tx = await battleships.placeShip(6, 0, 3, 0, { from: opponent })
    tx = await battleships.placeShip(7, 0, 2, 0, { from: opponent })

    tx = await battleships.playTurn(0, 2)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(0, 3)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(0, 4)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(1, 4)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(0, 5)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(1, 5)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(0, 6)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(1, 6)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(2, 6)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(3, 6)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(4, 6)
    tx = await battleships.playTurn(0, 0, { from: opponent })

    tx = await battleships.playTurn(5, 0)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(5, 1)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(6, 0)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(6, 1)
    tx = await battleships.playTurn(0, 0, { from: opponent })
    tx = await battleships.playTurn(7, 0)
    tx = await battleships.playTurn(0, 0, { from: opponent })
  })

  xit('getGameState returns 4', async () => {
    expect((await battleships.getGameState()).toNumber()).to.equal(4)
  })

  xit('emitted the GameOver event', () => {
    expect(getLog(tx, 'GameOver')).to.exist
  })

  xit('isGameOver is true for player', async () => {
    expect(await battleships.isGameOver()).to.be.true
  })

  xit('isGameOver is true for opponent', async () => {
    expect(await battleships.isGameOver({ from: opponent })).to.be.true
  })

  xit('whoseTurn returns 0x0', async () => {
    expect(await battleships.whoseTurn()).to.equal(Zero.address)
  })

  xit('player has no opponent', async () => {
    expect(await battleships.getOpponent()).to.equal(Zero.address)
  })

  xit('opponent has no opponent', async () => {
    expect(await battleships.getOpponent({ from: opponent })).to.equal(
      Zero.address
    )
  })
})
