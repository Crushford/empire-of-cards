import React from 'react'
import styled from 'styled-components'
import { Card } from '../../ActionSpace/Card'
import { CardEdge } from '../../ActionSpace/Card/style'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  height: 150px;
`
const AllCards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
const Title = styled.h2`
  margin: 0px;
`

export const PlayerHand = ({
  cards,
  faceUp,
  selectCard,
  selectedCard,
  retainingCardIds
}) => {
  return (
    <CardsContainer>
      <Title>Your Hand</Title>
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
                  isOnRetainedList={retainingCardIds.includes(card.id)}
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
