const { expect } = require('chai')
const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

const Zero = require('../utils/zero')
const { getLog } = require('../utils/txHelpers')
const assertThrows = require('../utils/assertThrows')
// const checkShipsNotPlaced = require('../utils/checkShipsNotPlaced')

contract('BattleshipsV1 all ships placed', ([player, opponent]) => {
  let battleships
  let tx
  const x = 3
  const y = 3
  const ship = 3
  const direction = 0
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
  before(async () => {
    battleships = await BattleshipsV1.new()
    await battleships.startGame(opponent)

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

  context('trying to place another ship', () => {
    it("player can't place another ship", () =>
      assertThrows(battleships.placeShip(x, y, ship, direction)))

    it("opponent can't place another ship", () =>
      assertThrows(
        battleships.placeShip(x, y, ship, direction, { from: opponent })
      )
    )
  })

  it('getGameState returns 3', async () => {
    expect((await battleships.getGameState()).toNumber()).to.equal(3)
  })
})
