const { expect } = require('chai')
const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

const Zero = require('../utils/zero')
const { getLog } = require('../utils/txHelpers')
const assertThrows = require('../utils/assertThrows')
// const checkShipsNotPlaced = require('../utils/checkShipsNotPlaced')

contract('BattleshipsV1 Play Turn', ([player, opponent]) => {
  let battleships
  let tx

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
  })

  it('opponent cannot playTurn', () =>
    assertThrows(battleships.playTurn(0, 0, { from: opponent })))

  context('player plays a turn', () => {
    before(async () => {
      tx = await battleships.playTurn(0, 0)
    })

    it('emitted the TurnPlayed event', () => {
      expect(getLog(tx, 'TurnPlayed')).to.exist
    })

    it("now it is the opponent's turn", async () => {
      expect(await battleships.whoseTurn()).to.equal(opponent)
    })

    context('opponent plays a turn', () => {
      before(async () => {
        tx = await battleships.playTurn(0, 0, { from: opponent })
      })

      it('emitted the TurnPlayed event', () => {
        expect(getLog(tx, 'TurnPlayed')).to.exist
      })

      it("now it is first player's turn", async () => {
        expect(await battleships.whoseTurn()).to.equal(player)
      })
    })
  })
})
