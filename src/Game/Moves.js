import { INVALID_MOVE } from 'boardgame.io/core'
import { CITY_COLORS } from '../constants'
import {
  shuffleArray,
  removeActionCardFromHand,
  discardBattleCards,
  moveCityAfterBattle,
  getTargetedDetailsFromId,
  checkIfPlayerHandIsAtCapacity
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
  if (G.playerHasDrawn) {
    return INVALID_MOVE
  }
  const currentPlayer = G.players[ctx.currentPlayer]

  // discard all cards not on retention list
  const discardCards = G.players[ctx.currentPlayer].hand.filter(
    card => !G.retainingCardIds.includes(card.id)
  )
  discardCards.forEach(discardingCard => {
    G.discardPile.push(discardingCard)
    G.players[ctx.currentPlayer].hand = G.players[
      ctx.currentPlayer
    ].hand.filter(cardInHand => cardInHand.id !== discardingCard.id)
  })

  // reset retaining cards
  G.retainingCardIds = []

  const additionalHandAllowance = currentPlayer.empire.filter(
    card => card.benefit === 'handCapacity'
  ).length

  while (
    currentPlayer.hand.length <
    G.normalHandSizeAllowance + additionalHandAllowance
  ) {
    currentPlayer.hand.push(G.deck.pop())
    if (G.deck[0] === undefined) {
      G.deck = shuffleArray(G.discardPile)
      G.discardPile = []
    }
  }
  G.playerHasDrawn = true
}

export const endTurn = (G, ctx) => {
  if (!checkIfPlayerHandIsAtCapacity(G, ctx) || !G.playerHasDrawn) {
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
  G.playerHasDrawn = false
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

  if (parseInt(targetedPlayerIndex) === parseInt(currentPlayerIndex)) {
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

  G.battle.attackBonus = G.players[G.target.attacker].empire.filter(
    card =>
      card.specialization && card.specialization.includes(G.battle.attack.title)
  ).length
  G.battle.defenceBonus =
    G.players[G.target.defender].empire.filter(
      card =>
        card.color === G.target.card.color && card.benefit === 'cityDefence'
    ).length || (G.target.card.benefit === 'cityDefence' ? 1 : 0)
  G.battle.waitingOnBattleResult = true
}

export const doNotDefend = (G, ctx) => {
  G.battle.waitingOnBattleResult = true
}

export const battleOutcome = (G, ctx) => {
  if (!G.battle.waitingOnBattleResult) {
    return INVALID_MOVE
  }
  const attackValue = G.battle.attack.attack + G.battle.attackBonus
  const defenceValue = G.battle.defend
    ? G.battle.defend.defence + G.battle.defenceBonus
    : 0

  if (attackValue > defenceValue) {
    moveCityAfterBattle(G)
  }

  const defenderColor = G.players[G.target.defender].color
  const battleOutcome =
    attackValue > defenceValue ? 'unsuccessfully' : 'successfully'
  const targetedColor = G.target.card.color
  const targetedCardTitle = G.target.card.title
  const attackingColor = G.players[G.target.attacker].color
  const attackingCardTitle = G.battle.attack.title

  if (G.battle.defend) {
    const defendingCardTitle = G.battle.defend.title
    G.log.push(
      `${defenderColor} ${battleOutcome} defends ${targetedColor} ${targetedCardTitle} with ${defendingCardTitle} against ${attackingColor}'s ${attackingCardTitle}. 
    ${G.battle.attackBonus > 0 ? 'An Attack bonus of 1 was applied.' : ''} 
    ${G.battle.defenceBonus > 0 ? 'A Defence bonus of 1 was applied.' : ''}`
    )
  } else {
    G.log
      .push(`${defenderColor} does not defend ${targetedColor} ${targetedCardTitle} 
   against ${attackingColor}'s ${attackingCardTitle}`)
  }

  discardBattleCards(G)
  G.selectedCard = ''
  G.battle.defenceBonus = 0
  G.battle.attackBonus = 0

  const playerAfterAttacker = (G.target.attacker + 1) % ctx.playOrder.length

  G.battle.waitingOnBattleResult = false
  ctx.events.endTurn({ next: playerAfterAttacker })
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

export const retainCard = (G, ctx, cardId) => {
  if (checkIfPlayerHandIsAtCapacity(G, ctx)) {
    return INVALID_MOVE
  }

  if (G.retainingCardIds.includes(cardId)) {
    G.retainingCardIds = G.retainingCardIds.filter(id => id !== cardId)
  } else {
    const retentionCapacity = G.players[ctx.currentPlayer].empire.filter(
      cardInEmpire => cardInEmpire.benefit === 'retentionCapacity'
    ).length
    const numberOfRetainedCards = G.retainingCardIds.length

    if (retentionCapacity > numberOfRetainedCards) {
      G.retainingCardIds.push(cardId)
    }
  }
}
