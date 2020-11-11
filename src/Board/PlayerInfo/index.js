import React from 'react'
import styled from 'styled-components'
import { getRelativePosition } from '../../utils'

const Banner = styled.div`
  height: 20px;
  width: 100%;
  background: ${({ color }) => color};
  z-index: -1;
`

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-area: ${({ gridAreaName }) => gridAreaName};
`

const AllCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

export const PlayerSpace = ({
  currentPlayer,
  selectCard,
  selectedCard,
  handleEmpireClick,
  handleCityClick,
  player: { color, hand, empire, position },
  targetId,
  numberOfPlayers,
  retainingCardIds
}) => {
  const relativePosition = getRelativePosition(
    position,
    currentPlayer,
    numberOfPlayers
  )

  const gridAreaName = `player${relativePosition}`

  return <Container gridAreaName={gridAreaName}></Container>
}
