import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'

const Banner = styled.div`
  height: 20px;
  width: 100%;
  background: ${({ color }) => color};
  z-index: -1;
`

const Container = styled.div`
  position: fixed;
  width: ${({ isCurrentPlayer }) => (isCurrentPlayer ? '100%' : '30%')};
  transform: rotate(${({ isCurrentPlayer }) => isCurrentPlayer && 180}deg);
  ${({ isCurrentPlayer }) => (isCurrentPlayer ? 'bottom' : 'top')}:0;
`

const AllCards = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  margin-top: -15px;
  width: 100%;
`

export const PlayerSpace = ({
  isCurrentPlayer,
  selectCard,
  selectedCard,
  handleEmpireClick,
  handleCityClick,
  player: { color, hand, empire, position },
  targetId
}) => {
  return (
    <Container position={position} isCurrentPlayer={isCurrentPlayer}>
      <Banner color={color} />
      <AllCards>
        <PlayerHand
          cards={hand}
          faceUp={isCurrentPlayer}
          selectCard={selectCard}
          selectedCard={selectedCard}
        />
        <PlayerEmpire
          cards={empire}
          faceUp={true}
          handleEmpireClick={handleEmpireClick}
          handleCityClick={handleCityClick}
          targetId={targetId}
        />
      </AllCards>
    </Container>
  )
}
