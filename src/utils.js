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

export const discardBattleCards = G => {
  G.discardPile.push(G.battle.attack)
  G.battle.attack = ''
  G.battle.defend && G.discardPile.push(G.battle.defend)
  G.battle.defend = ''
}

export const moveCity = G => {
  const attackingEmpire = G.players[G.target.attacker].empire

  G.players[G.target.defender].empire = G.players[
    G.target.defender
  ].empire.filter(card => card.id !== G.target.card.id)
  attackingEmpire.push(G.target.card)
}

export const getTargetedDetailsFromId = (G, attackedCityId) => {
  let targetedCard = {}
  let targetedPlayer = {}

  G.players.some((player, playerIndex) =>
    player.empire.some(item => {
      if (item.id === attackedCityId) {
        targetedCard = item
        targetedPlayer = playerIndex
        return true
      } else return false
    })
  )

  return [targetedCard, targetedPlayer]
}
