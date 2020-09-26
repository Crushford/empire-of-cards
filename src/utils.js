export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const removeActionCardFromHand = (currentPlayerHand, actionCard) => {
  let selectedCard = {}
  let newHand = currentPlayerHand.filter(card => {
    if (card.id === actionCard) {
      //add selected card to attack board
      selectedCard = card
      return false
    } else return true
  })

  return [selectedCard, newHand]
}

export const findAttackedPlayer = (players, attackedCityId) => {
  let attackedPlayer = ''
  players.forEach((player, playerIndex) =>
    player.empire.forEach(cityCard => {
      if (cityCard.id === attackedCityId) {
        attackedPlayer = playerIndex
      }
    })
  )
  return attackedPlayer
}

export const discardBattleCards = G => {
  G.discardPile.push(G.battle.attack)
  G.battle.attack = ''
  G.battle.defend && G.discardPile.push(G.battle.defend)
  G.battle.defend = ''
}

export const moveCity = G => {}

export const getPlacedEmpireCardFromId = (G, attackedCityId) => {
  let empireCard = {}

  G.players.some(player =>
    player.empire.some(item => {
      if (item.id === attackedCityId) {
        empireCard = item
        return true
      }
    })
  )

  return empireCard
}
