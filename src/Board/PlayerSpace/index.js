import React from 'react'
import styled from 'styled-components'
import { PlayerEmpire } from './PlayerEmpire'
import { PlayerHand } from './PlayerHand'
import { getRelativePosition } from '../../utils'

const getMobilePositionCSS = (position, currentPlayer, numberOfPlayers) => {
  const width = position === currentPlayer ? 70 : 25

  const relativePosition = getRelativePosition(
    position,
    currentPlayer,
    numberOfPlayers
  )

  if (relativePosition === 0) {
    return `bottom:0; width: ${width}%; left: ${50 - width / 2}%)`
  } else {
    return `top:0; transform: rotate(180deg); width: ${width}%; left: ${
      25 * relativePosition - width / 2
    }%;`
  }
}

const getPositionCSS = (position, currentPlayer, numberOfPlayers) => {
  const width = position === currentPlayer ? 1200 : 800

  switch (getRelativePosition(position, currentPlayer, numberOfPlayers)) {
    case 0:
      return `bottom:0; left: calc(50% - ${width / 2}px); width: ${width}px;`
    case 1:
      return `left: calc((${width}px - 250px) * -0.5); transform: rotate(90deg); top: calc(50% - ${
        width / 2
      }px); width: ${width}px;`
    case 2:
      return `top:0; transform: rotate(180deg); left: calc(50% - ${
        width / 2
      }px); width: ${width}px;`
    case 3:
      return `right: calc((${width}px - 250px) * -0.5); transform: rotate(270deg); top: calc(50% - ${
        width / 2
      }px); width: ${width}px;`
    default:
      console.error(`incorrect number of players`)
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
  ${({ position, currentPlayer, numberOfPlayers }) =>
    getPositionCSS(position, currentPlayer, numberOfPlayers)}

  @media only screen and (max-width: 1247px) {
    ${({ position, currentPlayer, numberOfPlayers }) => {
      getMobilePositionCSS(position, currentPlayer, numberOfPlayers)
    }}
  }
`

const AllCards = styled.div`
  height: 250px;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  margin-bottom: -20px;
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
  targetId,
  numberOfPlayers
}) => {
  return (
    <Container
      position={position}
      currentPlayer={currentPlayer}
      numberOfPlayers={numberOfPlayers}
    >
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
