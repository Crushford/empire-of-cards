import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'

const getPositionCSS = (position, currentPlayer) => {
  const width = position === currentPlayer ? '1200px' : '800px'

  const possiblePositions = [0, 1, 2, 3]

  const getRelativePosition = () => {
    let newPosition = position - currentPlayer
    return newPosition >= 0
      ? newPosition
      : possiblePositions[possiblePositions.length + newPosition]
  }

  switch (getRelativePosition()) {
    case 0:
      return `bottom:0; width: ${width}; left: calc(50% - (${width}) / 2)`
    case 1:
      return `left: calc((${width} - 250px) * -0.5); transform: rotate(90deg); top: calc(50% - (${width}) / 2); width: ${width};`
    case 2:
      return `top:0; transform: rotate(180deg); width: ${width}; left: calc(50% - (${width}) / 2);`
    case 3:
      return `right: calc((${width} - 250px) * -0.5); transform: rotate(270deg); top: calc(50% - (${width}) / 2); width: ${width};`
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
  ${({ position, currentPlayer }) => getPositionCSS(position, currentPlayer)}
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
  currentPlayer,
  selectCard,
  selectedCard,
  handleEmpireClick,
  handleCityClick,
  player: { color, hand, empire, position },
  targetId
}) => {
  return (
    <Container position={position} currentPlayer={currentPlayer}>
      <AllCards>
        <PlayerHand
          cards={hand}
          faceUp={currentPlayer === position}
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
