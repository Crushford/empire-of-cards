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

const getPositionCSS = (position, currentPlayer, numberOfPlayers, height) => {
  const width = position === currentPlayer ? 30 : 30

  switch (getRelativePosition(position, currentPlayer, numberOfPlayers)) {
    case 0:
      return `bottom:0; left: calc(50% - ${width / 2}vw); width: ${width}vw;`
    case 1:
      return `left: calc((${width}vh - ${height}) * -0.5); transform: rotate(90deg); top: calc(50%  - ${
        width / 2
      }vh); width: ${width}vh;`
    case 2:
      return `top:0; transform: rotate(180deg); left: calc(50% - ${
        width / 2
      }vw); width: ${width}vw;`
    case 3:
      return `right: calc((${width}vh - ${height}) * -0.5); transform: rotate(270deg); top: calc(50%  - ${
        width / 2
      }vh); width: ${width}vh;`
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
  height: ${({ height }) => height};
  ${({ position, currentPlayer, numberOfPlayers, height }) =>
    getPositionCSS(position, currentPlayer, numberOfPlayers, height)}
  @media only screen and (max-width: 1247px) {
    ${({ position, currentPlayer, numberOfPlayers, height }) => {
      getMobilePositionCSS(position, currentPlayer, numberOfPlayers, height)
    }}
  }
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
  return (
    <Container
      position={position}
      currentPlayer={currentPlayer}
      numberOfPlayers={numberOfPlayers}
      height={'350px'}
    >
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
