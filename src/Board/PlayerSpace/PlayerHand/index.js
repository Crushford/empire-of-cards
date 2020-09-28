import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 140px;
  width: 510px;
`

const HandContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;

  border: solid 1px black;
`
const Title = styled.h2`
  transform: rotate(180deg);
`

export const PlayerHand = ({ cards, faceUp, selectCard, selectedCard }) => {
  return (
    <HandContainer>
      <Title>Hand</Title>
      <CardsContainer>
        {cards &&
          cards.map((card, index) => (
            <Card
              key={card.id ? card.id : index}
              value={card}
              faceUp={faceUp}
              selectCard={selectCard}
              selectedCard={selectedCard}
            />
          ))}
      </CardsContainer>
    </HandContainer>
  )
}
