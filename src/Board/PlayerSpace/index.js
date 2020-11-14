import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'
import { getRelativePosition } from '../../utils'

const Container = styled.div`
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  ${({ gridAreaName }) => {
    switch (gridAreaName) {
      case 'player1':
        return `transform: rotate(90deg);
    transform-origin: 50% 37%;
    height: 79%;
    width: 133%;`
      case 'player2':
        return `transform: rotate(180deg);`
      case 'player3':
        return `transform: rotate(270deg);
    transform-origin: 38% 52%;
    height: 79%;
    width: 133%;`
      default:
        return
    }
  }}
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  grid-area: ${({ gridAreaName }) => gridAreaName};
`

const AllCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: -20px;
  height: 100%;
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
    <Wrapper gridAreaName={gridAreaName}>
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
      </Container>
    </Wrapper>
  )
}
