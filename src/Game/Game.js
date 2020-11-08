import { TurnOrder } from 'boardgame.io/core'
import { getDeck, PLAYER_COLORS } from '../constants'
import { shuffleArray, getAllPossibleMoves } from '../utils'

import {
  doNotDefend,
  pass,
  defendCity,
  attackCity,
  IsVictory,
  startRound,
  selectCard,
  moveToEmpire,
  endTurn,
  retainCard,
  battleOutcome
} from './Moves'

export const empireOfCards = (deckType, name, isPractice) => ({
  name: name,
  minPlayers: 2,
  setup: (G, ctx) => ({
    deck: shuffleArray(getDeck(deckType, G.numPlayers)),
    gameComplexity: deckType,
    players: PLAYER_COLORS.map(
      (color, index) =>
        // times index by 2 for 2 players, so there are just players indexes of 0 and 2 for board posistioning
        index < G.numPlayers && {
          color: color,
          position: index,
          hand: [],
          empire: []
        }
    ).filter(player => player),
    battle: { attack: {}, defend: {}, waitingOnBattleResult: false },
    target: {},
    timesPassed: 0,
    selectedCard: '',
    discardPile: [],
    completeSetsNeededToWin: 2,
    firstToAct: Array.from(Array(G.numPlayers).keys()),
    isPractice: isPractice,
    log: ['Game Started'],
    retainingCardIds: [],
    normalHandSizeAllowance: 5
  }),
  turn: {
    stages: {
      action: {
        moves: {
          selectCard,
          pass,
          doNotDefend,
          attackCity,
          defendCity,
          battleOutcome,
          moveToEmpire
        },
        onEnd: (G, ctx) => {
          G.timesPassed = 0
        }
      }
    }
  },

  phases: {
    newRound: {
      moves: { startRound, endTurn, retainCard },
      next: 'play',
      start: true,
      turn: { order: TurnOrder.CUSTOM_FROM('firstToAct') }
    },
    play: {
      moves: {
        selectCard,
        pass,
        doNotDefend,
        attackCity,
        defendCity,
        battleOutcome,
        moveToEmpire
      },
      endIf: (G, ctx) => {
        const noCardLeftInAnyHand =
          G.players.filter(player => player.hand.length === 0).length ===
          ctx.numPlayers
        const everyPlayerPasses = G.timesPassed >= ctx.numPlayers
        const notInBattle = !G.battle.attack

        return notInBattle && (noCardLeftInAnyHand || everyPlayerPasses)
      },
      next: 'newRound',
      turn: { order: TurnOrder.CUSTOM_FROM('firstToAct') },
      onEnd: (G, ctx) => {
        G.timesPassed = 0
        G.firstToAct.push(G.firstToAct.shift())
      }
    }
  },
  endIf: (G, ctx) => {
    const winner = IsVictory(G)
    if (winner !== null) {
      return { winner }
    }
  },
  ai: {
    enumerate: (G, ctx) => getAllPossibleMoves(G, ctx)
  }
})
