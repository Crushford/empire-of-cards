import React from 'react'
import styled from 'styled-components'
import { Card } from '../../common/Card'
import { CardEdge } from '../../common/Card/style'
import { HorizontalBorder } from '../../common'

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
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
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`
const getRotationValue = index => {
  const isOdd = index % 2 === 1

  // make 0 = 0, 1 & 2 = 3. 3 & 4 = 6 ...
  const value = parseInt((index + 1) / 2) * 3

  return isOdd ? -value : value
}

export const PlayerHand = ({
  cards,
  faceUp,
  selectCard,
  selectedCard,
  retainingCardIds
}) => {
  const sortedCardWithRotation = cards
    .map((card, index) => ({
      ...card,
      rotation: getRotationValue(index)
    }))
    .sort((a, b) => (a.rotation < b.rotation ? -1 : 1))

  return (
    <CardsContainer>
      <Title>Your Hand</Title>
      <HorizontalBorder />
      <AllCards>
        {sortedCardWithRotation && faceUp
          ? sortedCardWithRotation.map((card, index) => (
              <CardInHandWrapper>
                <Card
                  key={card.id ? card.id : index}
                  value={card}
                  faceUp={faceUp}
                  selectCard={selectCard}
                  selectedCard={selectedCard}
                  isOnRetainedList={retainingCardIds.includes(card.id)}
                  rotation={card.rotation}
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
