import { checkIfPlayerHandIsAtCapacity } from '../../utils'

export const getMessages = (G, ctx) => {
  if (G.battle.waitingOnBattleResult) return ''

  const currentPlayer = G.players[ctx.currentPlayer]
  const getHint = () => {
    if (ctx.winner) {
      return `Winner is player ${G.players[ctx.winner].color}`
    }

    if (ctx.phase === 'newRound') {
      const retentionCapacity = G.players[ctx.currentPlayer].empire.filter(
        cardInEmpire => cardInEmpire.benefit === 'retentionCapacity'
      ).length
      if (retentionCapacity > 1) {
        return `you may retain ${retentionCapacity} cards, click cards in your hand to select,  click the deck when you are finished to draw cards`
      }

      if (checkIfPlayerHandIsAtCapacity(G, ctx)) {
        return 'End your turn when you are ready'
      } else return 'click the deck to draw cards'
    }

    const isUnderAttack = G.battle?.attack?.title

    if (isUnderAttack) {
      switch (G.selectedCard[0]) {
        case 'c':
          return 'Now is not the time for that'
        case 'a':
          return 'Click defend box to defend'
        default:
          return 'Select army to defend or click do not defend'
      }
    }

    switch (G.selectedCard[0]) {
      case 'c':
        return 'Click empire to move to empire'
      case 'a':
        return 'Click city to attack'
      default:
        return 'Select card to play'
    }
  }

  const getSpecialMessage = () => {
    if (ctx.turn < 5 && currentPlayer.hand.length > 5) {
      let additionalHandAllowance = currentPlayer.empire.filter(
        card => card.benefit === 'handCapacity'
      ).length

      if (
        currentPlayer.hand.length >
        G.normalHandSizeAllowance + additionalHandAllowance
      ) {
        return 'If neither player is dealt any city cards to begin with, each player is dealt a card until a city card is dealt'
      }
    }

    return ''
  }

  return { hint: getHint(), specialMessage: getSpecialMessage() }
}
