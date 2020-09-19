import { INVALID_MOVE } from 'boardgame.io/core'
import { deck, cityColor } from './constants'
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

let startingDeck = []

for (let i = 0; i < 4; i++) {
  startingDeck.push(...deck.armies)
}
for (let i = 0; i < 4; i++) {
  deck.cities.forEach(card => {
    card['color'] = cityColor[i]
    startingDeck.push(card)
  })
}

const startingHand = startingDeck.slice(0, 5)
const startingEmpire = startingDeck.slice(0, 4)

export const TicTacToe = {
  setup: () => ({
    cards: {
      deck: shuffleArray(startingDeck),
      players: [
        {
          color: 'blue',
          position: 'top',
          hand: startingHand,
          empire: startingEmpire
        },
        {
          color: 'red',
          position: 'bottom',
          hand: startingHand,
          empire: startingEmpire
        }
      ],
      battle: { attack: {}, defend: {} },
      target: {}
    }
  }),

  turn: {
    moveLimit: 1
  }
}
