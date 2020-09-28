import React from 'react'
import styled from 'styled-components'

const Hint = styled.h5``

export const MessageBoard = ({ G, ctx }) => {
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
        return 'select card to action'
    }
  }

  const hint = getHint()

  return (
    <>
      <Hint>{hint}</Hint>
    </>
  )
}
