import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const PlayerHand = ({ cards, faceUp, selectCard, selectedCard }) => {
  return (
    <CardsContainer>
      {cards &&
        cards.map((card, index) => (
          <Card
            key={index}
            value={card}
            faceUp={faceUp}
            selectCard={selectCard}
            selectedCard={selectedCard}
          />
        ))}
    </CardsContainer>
  )
}
