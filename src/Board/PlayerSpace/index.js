import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'
import { getRelativePosition } from '../../utils'

const Banner = styled.div`
  height: 20px;
  width: 100%;
  background: ${({ color }) => color};
  z-index: -1;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-area: ${({ gridAreaName }) => gridAreaName};
  ${({ gridAreaName }) => {
    switch (gridAreaName) {
      case 'player1':
        return `transform: rotate(90deg);
    transform-origin: 50% 62%;`
      case 'player2':
        return `transform: rotate(180deg);`
      case 'player3':
        return `transform: rotate(270deg);
    transform-origin: 50% 38%;`
      default:
        return
    }
  }}
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

  return (
    <Container gridAreaName={gridAreaName}>
      <AllCards>
        <PlayerEmpire
          cards={empire}
          faceUp={true}
          handleEmpireClick={handleEmpireClick}
          handleCityClick={handleCityClick}
          targetId={targetId}
        />
        <PlayerHand
          cards={hand}
          faceUp={currentPlayer === position}
          selectCard={selectCard}
          selectedCard={selectedCard}
          retainingCardIds={retainingCardIds}
        />
      </AllCards>
      <Banner color={color} />
    </Container>
  )
}
