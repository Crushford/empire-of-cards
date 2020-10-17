import { INVALID_MOVE } from 'boardgame.io/core'
import { CITY_COLORS } from '../constants'
import {
  shuffleArray,
  removeActionCardFromHand,
  discardBattleCards,
  moveCity,
  getTargetedDetailsFromId
} from '../utils'

export const IsVictory = G => {
  let winner = null

  G.players.some((player, playerIndex) => {
    let empireCount = {}

    CITY_COLORS.forEach(color => {
      empireCount[color] = 0
    })

    player.empire.forEach(card => {
      empireCount[card.color]++
    })

    let fullSets = 0
    for (const key in empireCount) {
      if (empireCount[key] === 4) {
        fullSets++
      }
    }
    if (fullSets === G.completeSetsNeededToWin) {
      winner = playerIndex
      return true
    }
    return false
  })

  return winner
}

export const startRound = (G, ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer]

  let additionalHandAllowance = 0
  currentPlayer.empire
    .filter(card => card.benefit === 'handCapacity')
    .forEach(({ bonus }) => (additionalHandAllowance += bonus))

  while (
    currentPlayer.hand.length <
    currentPlayer.handSizeAllowance + additionalHandAllowance
  ) {
    currentPlayer.hand.push(G.deck.pop())
    if (G.deck[0] === undefined) {
      G.deck = shuffleArray(G.discardPile)
      G.discardPile = []
    }
  }
}

export const endTurn = (G, ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer]

  //check to see if player has any hand capacity bonus cards
  let additionalHandAllowance = 0
  currentPlayer.empire
    .filter(card => card.benefit === 'handCapacity')
    .forEach(({ bonus }) => (additionalHandAllowance += bonus))
  if (
    currentPlayer.hand.length <
    currentPlayer.handSizeAllowance + additionalHandAllowance
  ) {
    return INVALID_MOVE
  }

  // if call players have already picked up all of their cards
  if (
    G.players.filter(player => player.hand.length >= 5).length ===
    ctx.numPlayers
  ) {
    // on first round, after each player gets 5 cards, deal one card to each player, until someone has a city.
    if (ctx.turn < 5) {
      while (
        !G.players.some(player =>
          player.hand.some(card => card.id.indexOf('c') === 0)
        )
      ) {
        G.players.forEach(player => {
          player.hand.push(G.deck.pop())
        })
      }
    }
    ctx.events.endPhase()
  } else ctx.events.endTurn()
}

export const selectCard = (G, ctx, cardId) => {
  const currentPlayer = G.players[ctx.currentPlayer]

  // Cannot select card within current player's own empire
  if (currentPlayer.empire.filter(card => card.id === cardId) > 0) {
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

export const moveToEmpire = (G, ctx, _cardMoving = '') => {
  const isUnderAttack = G.battle && G.battle.attack && G.battle.attack.title
  const currentPlayer = G.players[ctx.currentPlayer]
  const cardMoving = _cardMoving || G.selectedCard
  const cardMovingIsCity = cardMoving.indexOf('c') !== -1

  if (!cardMovingIsCity || isUnderAttack) {
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

  G.timesPassed = 0
  ctx.events.endTurn()
}

export const attackCity = (G, ctx, attackedCityId, attackingArmy = '') => {
  const isUnderAttack = G.battle && G.battle.attack && G.battle.attack.title
  const isArmySelected = G.selectedCard.indexOf('a') >= 0

  if ((!isArmySelected && !attackingArmy) || isUnderAttack) {
    return INVALID_MOVE
  }

  const currentPlayerIndex = ctx.currentPlayer

  const [targetedCard, targetedPlayer] = getTargetedDetailsFromId(
    G,
    attackedCityId
  )
  G.target = {
    card: targetedCard,
    defender: targetedPlayer,
    attacker: currentPlayerIndex
  }

  if (targetedPlayer === currentPlayerIndex) {
    return INVALID_MOVE
  }

  const currentPlayer = G.players[currentPlayerIndex]

  //remove selected card from hand
  const [selectedCard, newHand] = removeActionCardFromHand(
    currentPlayer.hand,
    attackingArmy || G.selectedCard
  )

  currentPlayer.hand = newHand
  G.battle.attack = selectedCard
  G.selectedCard = ''
  G.timesPassed = 0

  ctx.events.endTurn({ next: `${targetedPlayer}` })
}

export const defendCity = (G, ctx) => {
  debugger
  const isArmySelected = G.selectedCard.indexOf('a') >= 0
  if (!isArmySelected) {
    return INVALID_MOVE
  }

  const currentPlayer = G.players[ctx.currentPlayer]

  const [army, newHand] = removeActionCardFromHand(
    currentPlayer.hand,
    G.selectedCard
  )

  currentPlayer.hand = newHand
  G.battle.defend = army

  if (G.battle.attack.attack > G.battle.defend.defence) {
    moveCity(G)
  }
  discardBattleCards(G)

  const playerAfterAttacker =
    G.target.attacker === ctx.numPlayers - 1 ? 0 : G.target.attacker + 1

  G.target = {}
  ctx.events.endTurn({ next: `${playerAfterAttacker}` })
}

export const doNotDefend = (G, ctx) => {
  G.battle.defend = false
  G.discardPile.push(G.battle.attack)
  G.battle.attack = ''

  discardBattleCards(G)
  moveCity(G)

  G.selectedCard = ''

  const playerAfterAttacker =
    G.target.attacker === ctx.numPlayers - 1 ? 0 : G.target.attacker + 1

  ctx.events.endTurn({ next: `${playerAfterAttacker}` })
  G.target = {}
}

export const pass = (G, ctx) => {
  G.timesPassed += 1
  G.selectedCard = ''
  if (G.timesPassed >= ctx.numPlayers) {
    ctx.events.endPhase()
  }
  ctx.events.endStage()
  ctx.events.endTurn()
}
