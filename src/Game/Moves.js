import { INVALID_MOVE } from 'boardgame.io/core'
import { CITY_COLORS } from '../constants'
import {
  shuffleArray,
  removeActionCardFromHand,
  discardBattleCards,
  moveCityAfterBattle,
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
      G.log.push(
        `${currentPlayer.color} places ${card.color} ${card.title} into their empire`
      )
      return false
    } else return true
  })

  G.timesPassed = 0
  ctx.events.endTurn()
}

export const attackCity = (
  G,
  ctx,
  attackedCityId,
  attackingArmyIndexFromBot = ''
) => {
  const isUnderAttack = G.battle && G.battle.attack && G.battle.attack.title

  const attackingCardIndex = attackingArmyIndexFromBot || G.selectedCard

  const isArmySelected = attackingCardIndex.indexOf('a') >= 0

  if (!isArmySelected || isUnderAttack) {
    return INVALID_MOVE
  }

  const currentPlayerIndex = ctx.currentPlayer

  const { targetedCard, targetedPlayerIndex } = getTargetedDetailsFromId(
    G,
    attackedCityId
  )

  if (targetedPlayerIndex === currentPlayerIndex) {
    return INVALID_MOVE
  }

  G.target = {
    card: targetedCard,
    defender: targetedPlayerIndex,
    attacker: currentPlayerIndex
  }

  const currentPlayer = G.players[currentPlayerIndex]

  //remove attacking card from hand
  const { removedCard: attackingCard, newHand } = removeActionCardFromHand(
    currentPlayer.hand,
    attackingCardIndex
  )

  currentPlayer.hand = newHand

  G.battle.attack = attackingCard
  G.selectedCard = ''
  G.timesPassed = 0

  G.log.push(
    `${G.players[G.target.attacker].color} attacks ${
      G.players[G.target.defender].color
    }'s ${G.target.card.color} ${targetedCard.title}`
  )

  ctx.events.endTurn({ next: `${targetedPlayerIndex}` })
}

export const defendCity = (G, ctx, defendingCardIndexFromBot = '') => {
  const defendingCardIndex = defendingCardIndexFromBot || G.selectedCard
  const isArmySelected = defendingCardIndex.indexOf('a') >= 0
  if (!isArmySelected) {
    return INVALID_MOVE
  }

  const currentPlayer = G.players[G.target.defender]

  //remove attacking card from hand
  const { removedCard: defendingCard, newHand } = removeActionCardFromHand(
    currentPlayer.hand,
    defendingCardIndex
  )

  currentPlayer.hand = newHand
  G.battle.defend = defendingCard

  if (G.battle.attack.attack > G.battle.defend.defence) {
    moveCityAfterBattle(G)
  }
  G.log.push(
    `${G.players[G.target.defender].color} ${
      G.battle.attack.attack > G.battle.defend.defence
        ? 'unsuccessfully'
        : 'successfully'
    } defends ${G.target.card.color} ${G.target.card.title} with ${
      G.battle.defend.title
    } against ${G.players[G.target.attacker].color}'s ${G.battle.attack.title}`
  )
  discardBattleCards(G)

  const playerAfterAttacker = (G.target.attacker + 1) % ctx.playOrder.length

  ctx.events.endTurn({ next: playerAfterAttacker })
  G.target = {}
}

export const doNotDefend = (G, ctx) => {
  G.battle.defend = false

  G.log.push(`${G.players[G.target.defender].color} does not defend ${
    G.target.card.color
  } ${G.target.card.title} 
   against ${G.players[G.target.attacker].color}'s ${G.battle.attack.title}`)

  discardBattleCards(G)
  moveCityAfterBattle(G)

  G.selectedCard = ''

  const playerAfterAttacker = (G.target.attacker + 1) % ctx.playOrder.length

  ctx.events.endTurn({ next: `${playerAfterAttacker}` })
  G.target = {}
}

export const pass = (G, ctx) => {
  G.timesPassed += 1
  G.selectedCard = ''

  G.log.push(`${G.players[ctx.currentPlayer].color} passes`)

  if (G.timesPassed >= ctx.numPlayers) {
    ctx.events.endPhase()
  }
  ctx.events.endStage()
  ctx.events.endTurn()
}
