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
  moveToEmpire
} from './Moves'

export const empireOfCards = (deckType, name, isPractice) => ({
  name: name,
  minPlayers: 2,
  setup: (G, ctx) => ({
    deck: shuffleArray(getDeck(deckType)),
    gameComplexity: 'simple',
    players: PLAYER_COLORS.map(
      (color, index) =>
        // times index by 2 for 2 players, so there are just players indexes of 0 and 2 for board posistioning
        index < G.numPlayers && {
          color: color,
          position: index,
          hand: [],
          empire: [],
          handSizeAllowance: 5
        }
    ).filter(player => player),
    battle: { attack: {}, defend: {} },
    target: {},
    timesPassed: 0,
    selectedCard: '',
    discardPile: [],
    completeSetsNeededToWin: 2,
    firstToAct: Array.from(Array(G.numPlayers).keys())
  }),
  turn: {
    stages: {
      action: {
        moves: {
          selectCard,
          pass,
          attackCity,
          moveToEmpire,
          defendCity,
          doNotDefend
        },
        onEnd: (G, ctx) => {
          G.timesPassed = 0
        }
      }
    }
  },

  phases: {
    newRound: {
      moves: { startRound, endTurn },
      next: 'play',
      start: true,
      turn: { order: TurnOrder.CUSTOM_FROM('firstToAct') }
    },
    play: {
      moves: {
        selectCard,
        pass,
        doNotDefend,
        endTurn,
        attackCity,
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
      onEnd: (G, ctx) => {
        G.players.forEach(player => {
          G.discardPile.push(...player.hand)
          player.hand = []
        })

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
