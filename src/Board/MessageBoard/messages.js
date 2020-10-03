export const getMessages = (G, ctx) => {
  const getHint = () => {
    if (ctx.winner) {
      return `Winner is player ${G.players[ctx.winner].color}`
    }

    if (ctx.phase === 'newRound') {
      return 'click the deck to draw cards'
    }

    const isUnderAttack = G.battle?.attack?.title

    if (isUnderAttack) {
      switch (G.selectedCard[0]) {
        case 'c':
          return 'now is not the time for that'
        case 'a':
          return 'click defend box to defend'
        default:
          return 'select army to defend or click do not defend'
      }
    }

    switch (G.selectedCard[0]) {
      case 'c':
        return 'click empire to move to empire'
      case 'a':
        return 'click city to attack'
      default:
        return 'select card to play'
    }
  }

  const getSpecialMessage = () => {
    const currentPlayer = G.players[ctx.currentPlayer]

    if (ctx.turn < 5 && currentPlayer.hand.length > 5) {
      let additionalHandAllowance = 0
      currentPlayer.empire
        .filter(card => card.benefit === 'handCapacity')
        .forEach(({ bonus }) => (additionalHandAllowance += bonus))

      if (
        currentPlayer.hand.length >
        currentPlayer.handSizeAllowance + additionalHandAllowance
      ) {
        return 'If neither player is dealt any city cards to begin with, each player is dealt a card until a city card is dealt'
      }
    }

    return ''
  }

  return { hint: getHint(), specialMessage: getSpecialMessage() }
}
