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
  ctx.events.endTurn()
}

const selectCard = (G, ctx, cardId) => {
  if (
    G.players[ctx.currentPlayer].empire.filter(card => card.id === cardId) > 0
  ) {
    return INVALID_MOVE
  }

  G.selectedCard = cardId
  ctx.events.setActivePlayers({
    currentPlayer: 'action',
    // Calls endStage automatically after the player
    // has made the specified number of moves.
    moveLimit: 1,

    // This takes the stage configuration to the
    // value prior to this setActivePlayers call
    // once the set of active players becomes empty
    // (due to players either calling endStage or
    // a moveLimit ending the stage for them).
    revert: false
  })
}

const moveToEmpire = (G, ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer]
  const cardMoving = G.selectedCard

  if (cardMoving.indexOf('c') < 0) {
    return INVALID_MOVE
  }

  //remove selected card from hand
  currentPlayer.hand = currentPlayer.hand.filter(card => {
    if (card.id === cardMoving) {
      //add selected card to empire
      currentPlayer.empire.push(card)
      G.selectedCard = ''
      return false
    } else return true
  })

  ctx.events.endTurn()
}

const attackCity = (G, ctx, attackedCityId) => {
  if (G.selectedCard.indexOf('a') < 0) {
    return INVALID_MOVE
  }

  const findAttackedPlayer = () => {
    let attackedPlayer = ''
    G.players.forEach((player, playerIndex) =>
      player.empire.forEach(cityCard => {
        if (cityCard.id === attackedCityId) {
          attackedPlayer = playerIndex
        }
      })
    )
    return attackedPlayer
  }

  const attackedPlayerIndex = findAttackedPlayer()
  const currentPlayerIndex = +ctx.currentPlayer

  if (attackedPlayerIndex === currentPlayerIndex) {
    return INVALID_MOVE
  }

  const currentPlayer = G.players[ctx.currentPlayer]

  //remove selected card from hand
  currentPlayer.hand = currentPlayer.hand.filter(card => {
    if (card.id === G.selectedCard) {
      //add selected card to attack board
      G.battle.attack = card
      G.selectedCard = ''
      return false
    } else return true
  })

  ctx.events.setActivePlayers({
    // Enumerate the set of players and the stages that they
    // are in.
    value: {
      [attackedPlayerIndex]: 'defend'
    },

    // Calls endStage automatically after the player
    // has made the specified number of moves.
    moveLimit: 1,

    // This takes the stage configuration to the
    // value prior to this setActivePlayers call
    // once the set of active players becomes empty
    // (due to players either calling endStage or
    // a moveLimit ending the stage for them).
    revert: true
  })

  ctx.events.endTurn()
}

const defendCity = (G, ctx, army) => {
  G.battle.defend = army
  ctx.events.endStage()
  ctx.events.endTurn()
}

const doNotDefend = (G, ctx) => {
  G.battle.defend = false
  ctx.events.endStage()
  ctx.events.endTurn()
}

const pass = (G, ctx) => {
  G.timesPassed += 1
  ctx.events.endTurn()
}

export const EmpireOfCards = {
  setup: () => ({
    deck: shuffleArray(deck),
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
    timesPassed: 0,
    selectedCard: ''
  }),

  turn: {
    stages: {
      action: {
        moves: { selectCard, pass, attackCity, moveToEmpire }
      },
      defend: {
        moves: { defendCity, doNotDefend }
      }
    }
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
        selectCard,
        pass
      },
      endIf: (G, ctx) => {
        const noCardLeftInHand =
          G.players.filter(player => player.hand.length === 0).length ===
          ctx.numPlayers
        const everyPlayerPasses = G.timesPassed >= ctx.numPlayers

        return noCardLeftInHand || everyPlayerPasses
      },
      next: 'newRound',
      onEnd: (G, ctx) => {
        G.timesPassed = 0
      }
    }
  }
}
