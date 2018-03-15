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
    tx = await battleships.placeShip(0, 0, 1, 0)
    tx = await battleships.placeShip(0, 0, 1, 0, { from: opponent })
  })

  xit('opponent cannot playTurn', async () => {
    assertThrows(await battleships.playTurn(0, 0, { from: opponent }))
  })

  xcontext('player plays a turn', () => {
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
