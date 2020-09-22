import { INVALID_MOVE } from 'boardgame.io/core'
import { deck } from './constants'
import { shuffleArray } from './utils'

// Return true if `cells` is in a winning configuration.
// function IsVictory(cells) {
//   const positions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ]

//   const isRowComplete = row => {
//     const symbols = row.map(i => cells[i])
//     return symbols.every(i => i !== null && i === symbols[0])
//   }

//   return positions.map(isRowComplete).some(i => i === true)
// }

// // Return true if all `cells` are occupied.
// function IsDraw(cells) {
//   return cells.filter(c => c === null).length === 0
// }

let startingDeck = [...deck.armies, ...deck.cities]

const startRound = (G, ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer]

  let additionalHandAllowance = 0
  currentPlayer.empire
    .filter(card => card.benefit === 'handCapacity')
    .forEach(({ benefit }) => (additionalHandAllowance += benefit))

  while (
    currentPlayer.hand.length <
    currentPlayer.handSizeAllowance + additionalHandAllowance
  ) {
    currentPlayer.hand.push(G.deck.pop())
  }
}

function drawCard(G, ctx) {
  G.players[ctx.currentPlayer].hand.push(G.deck.pop())
}

function playCard(G, ctx) {
  G.deck++
  G.hand[ctx.currentPlayer]--
}

export const EmpireOfCards = {
  setup: () => ({
    deck: shuffleArray(startingDeck),
    players: [
      {
        color: 'blue',
        position: 'top',
        hand: [],
        empire: [],
        handSizeAllowance: 5
      },
      {
        color: 'red',
        position: 'bottom',
        hand: [],
        empire: [],
        handSizeAllowance: 5
      }
    ],
    battle: { attack: {}, defend: {} },
    target: {},
    timesPassed: 0
  }),

  turn: {
    moveLimit: 1
  },

  phases: {
    newRound: {
      moves: { startRound },
      endIf: (G, ctx) =>
        G.players.filter(player => player.hand.length === 5).length ===
        ctx.numPlayers,
      next: 'play',
      start: true
    },
    play: {
      moves: {
        clickCard: (G, ctx, id) => {
          G.cells[id] = ctx.currentPlayer
        },
        drawCard,
        playCard
      }
    }
  }
}
