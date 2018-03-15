const { expect } = require('chai')
const BattleshipsV1 = artifacts.require('./BattleshipsV1.sol')

const Zero = require('../utils/zero')
const { getLog } = require('../utils/txHelpers')
const assertThrows = require('../utils/assertThrows')
// const checkShipsNotPlaced = require('../utils/checkShipsNotPlaced')

contract('BattleshipsV1 placeShip', ([player, opponent, nonplayer]) => {
  let battleships
  let tx
  const x = 3
  const y = 3
  const ship = 3
  const direction = 0

  before(async () => {
    battleships = await BattleshipsV1.new()
    await battleships.startGame(opponent)
    tx = await battleships.placeShip(x, y, ship, direction)
  })

  it('ShipPlaced event was emitted', () => {
    expect(getLog(tx, 'ShipPlaced')).to.be.ok
  })

  it('getGameState returns 2', async () => {
    expect((await battleships.getGameState()).toNumber()).to.equal(2)
  })

  it('opponents getGameState returns 2', async () => {
    expect(
      (await battleships.getGameState({ from: opponent })).toNumber()
    ).to.equal(2)
  })

  it("whoseTurn returns 'player'", async () => {
    expect(await battleships.whoseTurn()).to.equal(player)
  })

  it('isGameOver returns false', async () => {
    expect(await battleships.isGameOver()).to.be.false
  })

  describe('cells are as expected', () => {
    it('getCell(3, 2) returns 0', async () => {
      expect((await battleships.getCell(3, 2)).toNumber()).to.equal(0)
    })

    it('getCell(4, 3) returns 0', async () => {
      expect((await battleships.getCell(4, 3)).toNumber()).to.equal(0)
    })

    it('getCell(3, 3) returns 3', async () => {
      expect((await battleships.getCell(x, y)).toNumber()).to.equal(ship)
    })

    it('getCell(3, 4) returns 3', async () => {
      expect((await battleships.getCell(x, y + 1)).toNumber()).to.equal(ship)
    })

    it('getCell(3, 5) returns 3', async () => {
      expect((await battleships.getCell(x, y + 2)).toNumber()).to.equal(ship)
    })

    it('getCell(3, 6) returns 0', async () => {
      expect((await battleships.getCell(x, y + 3)).toNumber()).to.equal(0)
    })
  })

  describe('placing a second ship', () => {
    const x2 = 1
    const y2 = 1
    const x3 = 2
    const y3 = 2
    const ship2 = 5
    const direction2 = 1

    before(async () => {
      tx = await battleships.placeShip(x2, y2, ship2, direction2)
    })

    it('ShipPlaced event was emitted', () => {
      expect(getLog(tx, 'ShipPlaced')).to.be.ok
    })

    it("Can't place overlapping ship", () =>
      assertThrows(battleships.placeShip(x3, y3, 1, direction2)))

    it("Can't place ship out of bounds", () =>
      assertThrows(battleships.placeShip(8, 8, 4, 0)))

    it("Can't place ship that stretches to out of bounds", () =>
      assertThrows(battleships.placeShip(5, 5, 4, 0)))

    describe('opponent can place a ship', () => {
      before(async () => {
        tx = await battleships.placeShip(x2, y2, ship2, direction2, {
          from: opponent
        })
      })

      it('ShipPlaced event was emitted', () => {
        expect(getLog(tx, 'ShipPlaced')).to.be.ok
      })

      // These two tests can currently play, as we assert only that at
      // least one ship has been placed, not all of them.
      it("player can't play a turn", () =>
        assertThrows(battleships.playTurn(5, 5)))

      it("opponent can't play a turn", () =>
        assertThrows(battleships.playTurn(5, 5, { from: opponent })))
    })
  })

  describe('nonplayer', () => {
    it("can't place a ship", () =>
      assertThrows(battleships.placeShip(1, 1, 1, 1, { from: nonplayer })))

    it("can't play a turn", () =>
      assertThrows(battleships.playTurn(1, 1, { from: nonplayer })))
  })

  // ;[1, 2, 3, 4, 5].forEach(checkShipsNotPlaced)
})
