import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'

const getPositionCSS = (position, isCurrentPlayer) => {
  const width = isCurrentPlayer ? '100%' : '40%'

  switch (position) {
    case 0:
      return `bottom:0; width: ${width};`
    case 1:
      return `left: calc((${width} - 250px) * -0.5); transform: rotate(90deg); top: 35%; width: ${width};`
    case 2:
      return `top:0; transform: rotate(180deg); width: ${width} ;`
    case 3:
      return `right: calc((${width} - 250px) * -0.5); transform: rotate(270deg); top: 35%; width: ${width};`
    default:
      console.log(`incorrect number of players`)
  }
}

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
  height: 250px;
  ${({ position, isCurrentPlayer }) =>
    getPositionCSS(position, isCurrentPlayer)}
`

const AllCards = styled.div`
  height: 250px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: -10px;
  justify-content: space-evenly;
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
      <Banner color={color} />
    </Container>
  )
}
