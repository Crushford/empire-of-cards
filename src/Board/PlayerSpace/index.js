import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card'

const Banner = styled.div`
  height: 20px;
  width: 100%;
  background: ${({ color }) => color};
  z-index: -1;
`

const Container = styled.div`
  position: fixed;
  height: 33%;
  width: 60%;
  border: solid 1px hotpink;
  transform: rotate(${({ position }) => position === 'bottom' && 180}deg);
  ${({ position }) => position}:0;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const AllCards = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  margin-top: -15px;
  width: 100%;
`

const Cards = ({ cards, faceUp }) => {
  return (
    <CardsContainer>
      {cards &&
        cards.map((card, index) => (
          <Card key={index} value={card} faceUp={faceUp} />
        ))}
    </CardsContainer>
  )
}

export const PlayerSpace = ({ player: { color, hand, empire, position } }) => {
  return (
    <Container position={position}>
      <Banner color={color} />
      <AllCards>
        <Cards cards={hand} faceUp={false} />
        <Cards cards={empire} faceUp={false} />
      </AllCards>
    </Container>
  )
}
