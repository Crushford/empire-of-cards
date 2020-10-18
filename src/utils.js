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

export const getAllPossibleMoves = (G, ctx) => {
  let moves = []

  if (ctx.phase === 'newRound') {
    if (G.players[ctx.currentPlayer].hand[0]) {
      moves.push({ move: 'endTurn', args: [] })
    } else {
      moves.push({ move: 'startRound', args: [] })
    }
  } else {
    const isUnderAttack = G.battle && G.battle.attack && G.battle.attack.title
    if (isUnderAttack) {
      moves.push({ move: 'doNotDefend', args: [] })
      G.players[ctx.currentPlayer].hand.forEach(actionCard => {
        if (actionCard.id[0] === 'a') {
          moves.push({ move: 'defendCity', args: [actionCard.id] })
        }
      })
    } else {
      moves.push({ move: 'pass', args: [] })
      G.players[ctx.currentPlayer].hand.forEach(actionCard => {
        if (actionCard.id[0] === 'c') {
          // Ai Random attacks way more because way more moves are generated for each possibility fo this should even it out
          moves.push({ move: 'moveToEmpire', args: [actionCard.id] })
          G.players.forEach(player => {
            player.empire.forEach(city => {
              moves.push({
                move: 'moveToEmpire',
                args: [actionCard.id]
              })
            })
          })
        } else {
          G.players.forEach((player, index) => {
            if (index === ctx.currentPlayer) {
              player.empire.forEach(city => {
                moves.push({
                  move: 'attackCity',
                  args: [city.id, actionCard.id]
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

export const randomAiMove = (G, ctx) => {
  const moves = getAllPossibleMoves(G, ctx)
  const randomMoveIndex = Math.floor(
    Math.random() * Math.floor(moves.length - 1)
  )
  return moves[randomMoveIndex]
}
