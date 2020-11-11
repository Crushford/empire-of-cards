import React from 'react'
import styled from 'styled-components'
import { getRelativePosition } from '../../utils'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-area: ${({ gridAreaName }) => gridAreaName};
`

export const PlayerInfo = ({
  playerName,
  player: { position },
  numberOfPlayers,
  currentPlayer
}) => {
  const relativePosition = getRelativePosition(
    position,
    currentPlayer,
    numberOfPlayers
  )

  const gridAreaName = `playerInfo${relativePosition}`

  return (
    <Container gridAreaName={gridAreaName}>
      <h1>{playerName}</h1>
    </Container>
  )
}
