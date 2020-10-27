import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'
import { CardEdge } from '../../Card/style'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
  margin-bottom: -10px;
  min-width: 160px;
  max-width: 50%;
  z-index: 1;
`
const AllCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 160px;
`
const CardInHandWrapper = styled.div`
  overflow: 'hidden';
  &:hover {
    overflow: visible;
  }
  &:last-child {
    overflow: visible;
  }
`
const Title = styled.h2``

export const PlayerHand = ({ cards, faceUp, selectCard, selectedCard }) => {
  return (
    <CardsContainer>
      {faceUp && <Title>Your Hand</Title>}
      <AllCards>
        {cards && faceUp
          ? cards.map((card, index) => (
              <CardInHandWrapper>
                <Card
                  key={card.id ? card.id : index}
                  value={card}
                  faceUp={faceUp}
                  selectCard={selectCard}
                  selectedCard={selectedCard}
                />
              </CardInHandWrapper>
            ))
          : cards.map((card, index) =>
              index === cards.length - 1 ? (
                <Card
                  key={card.id ? card.id : index}
                  value={card}
                  faceUp={faceUp}
                  selectCard={selectCard}
                  selectedCard={selectedCard}
                />
              ) : (
                <CardEdge />
              )
            )}
      </AllCards>
    </CardsContainer>
  )
}
