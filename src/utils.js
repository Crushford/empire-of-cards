import { CITY_COLORS } from './constants'

export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const removeActionCardFromHand = (currentPlayerHand, actionCard) => {
  let removedCard = {}
  let newHand = currentPlayerHand.filter(card => {
    if (card.id === actionCard) {
      //add selected card to attack board
      removedCard = card
      return false
    } else return true
  })

  return { removedCard, newHand }
}

export const discardBattleCards = G => {
  G.discardPile.push(G.battle.attack)
  G.battle.attack = ''
  G.battle.defend && G.discardPile.push(G.battle.defend)
  G.battle.defend = ''
}

export const moveCityAfterBattle = G => {
  const defendingPlayerIndex = G.target.defender
  G.players[defendingPlayerIndex].empire = G.players[
    defendingPlayerIndex
  ].empire.filter(card => card.id !== G.target.card.id)
  G.players[G.target.attacker].empire.push(G.target.card)
}

export const getTargetedDetailsFromId = (G, attackedCityId) => {
  let targetedCard = {}
  let targetedPlayerIndex = 0

  G.players.some((player, playerIndex) =>
    player.empire.some(item => {
      if (item.id === attackedCityId) {
        targetedCard = item
        targetedPlayerIndex = playerIndex
        return true
      } else return false
    })
  )

  return { targetedCard, targetedPlayerIndex }
}

export const checkIfPlayerHandIsAtCapacity = (G, ctx) => {
  const additionalHandAllowance = G.players[ctx.currentPlayer].empire.filter(
    card => card.benefit === 'handCapacity'
  ).length

  return (
    G.players[ctx.currentPlayer].hand.length >=
    G.normalHandSizeAllowance + additionalHandAllowance
  )
}

export const getAllPossibleMoves = ({ G, ctx, isMultiplayer, matchData }) => {
  let moves = []

  if (ctx.phase === 'newRound') {
    if (checkIfPlayerHandIsAtCapacity(G, ctx)) {
      moves.push({ move: 'startRound', args: [] })
    } else {
      moves.push({ move: 'drawFromDeck', args: [] })
    }
  } else {
    const isUnderAttack = G.battle && G.battle.attack && G.battle.attack.title
    if (isUnderAttack) {
      moves.push({ move: 'doNotDefend', args: [] })
      G.players[ctx.currentPlayer].hand.forEach(actionCard => {
        if (actionCard.id && actionCard.id[0] === 'a') {
          moves.push({ move: 'defendCity', args: [actionCard.id] })
        }
      })
    } else {
      moves.push({ move: 'pass', args: [{ isMultiplayer, matchData }] })
      G.players[ctx.currentPlayer].hand.forEach(actionCard => {
        if (actionCard.id && actionCard.id[0] === 'c') {
          // Ai Random attacks way more because way more moves are generated for each possibility so this should even it out
          moves.push({
            move: 'moveToEmpire',
            args: [{ _cardMoving: actionCard.id, isMultiplayer, matchData }]
          })
          // add moves more times
          G.players.forEach(player => {
            player.empire.forEach(city => {
              moves.push({
                move: 'moveToEmpire',
                args: [{ _cardMoving: actionCard.id, isMultiplayer, matchData }]
              })
            })
          })
        } else {
          G.players.forEach((player, playerIndex) => {
            if (playerIndex !== parseInt(ctx.currentPlayer)) {
              player.empire.forEach(city => {
                moves.push({
                  move: 'attackCity',
                  args: [
                    {
                      attackedCityId: city.id,
                      attackingArmyIndexFromBot: actionCard.id,
                      isMultiplayer,
                      matchData
                    }
                  ]
                })
              })
            }
          })
        }
      })
    }
  }

  return moves
}

export const randomAiMove = ({ G, ctx, isMultiplayer, matchData }) => {
  const moves = getAllPossibleMoves({ G, ctx, isMultiplayer, matchData })
  if (moves.length === 1) {
    return moves[0]
  }
  const randomMoveIndex = Math.floor(
    Math.random() * Math.floor(moves.length - 1)
  )
  // attack city if player already has some of the empire
  if (G.players[ctx.currentPlayer].empire[0]) {
    const empires = {}

    CITY_COLORS.forEach(color => {
      empires[color] = [...G.players[ctx.currentPlayer].empire].filter(card => {
        return card.id.match(color)
      }).length
    })

    const biggestCollection = Object.keys(empires).reduce((a, b) =>
      empires[a] > empires[b] ? a : b
    )

    empires[biggestCollection] = 0

    const secondBiggestCollection = Object.keys(empires).reduce((a, b) =>
      empires[a] > empires[b] ? a : b
    )

    const preferredMove = moves
      .filter(move => move.move === 'attackCity')
      .find(move => move.args[0].attackedCityId.match(biggestCollection))

    const secondPreferredMove = moves
      .filter(move => move.move === 'attackCity')
      .find(move => move.args[0].attackedCityId.match(secondBiggestCollection))

    if (preferredMove) {
      for (let i = 0; i < 5; i++) {
        moves.push(preferredMove)
        if (secondPreferredMove) {
          moves.push(preferredMove)
        }
      }
    }
  }

  return moves[randomMoveIndex]
}

export const getRelativePosition = (
  position,
  currentPlayer,
  numberOfPlayers
) => {
  const getPossiblePositions = players => {
    switch (players) {
      case 2:
        return [0, 2]
      case 3:
        return [0, 1, 2]
      default:
        return [0, 1, 2, 3]
    }
  }

  const possiblePositions = getPossiblePositions(numberOfPlayers)
  let newPosition = position - currentPlayer
  return newPosition >= 0
    ? possiblePositions[newPosition]
    : possiblePositions[possiblePositions.length + newPosition]
}

export const getPlayerName = ({
  index,
  isPractice,
  isMultiplayer,
  matchData
}) => {
  if (isPractice) {
    return index === 0 ? 'You' : 'Computer ' + index
  }

  if (isMultiplayer) {
    return matchData[index].name
  }
  return 'Player ' + index
}
