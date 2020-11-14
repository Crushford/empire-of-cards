import React from 'react'
import styled from 'styled-components'

const EndTurnButton = styled.button`
  padding: 40px;
  background: lightblue;
  grid-area: endTurnButton;
`
export const EndTurn = ({ onClick, showEndTurn, isUnderAttack, phase }) => {
  const getMessage = phase => {
    if (phase === 'newRound') {
      return showEndTurn && 'End Turn'
    } else {
      return isUnderAttack ? 'Do Not Defend' : 'Pass'
    }
  }
  const message = getMessage(phase)

  return message && <EndTurnButton onClick={onClick}>{message}</EndTurnButton>
}
