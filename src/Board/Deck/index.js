import React from 'react'
import styled from 'styled-components'
import { Card } from '../common/Card'
import { CardEdge } from '../common/Card/style'

const Title = styled.h2`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`
const Information = styled.p`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  grid-area: deck;
`
const Cards = styled.div`
  display: flex;
  flex-direction: row;
`
export const Deck = ({ onClick, cardsInDeck }) => {
  return (
    <Container onClick={onClick}>
      <Title>Deck </Title>
      <Information>(cards left in deck = {cardsInDeck})</Information>
      <Cards>
        <CardEdge />
        <CardEdge />
        <Card faceUp={false} />
      </Cards>
    </Container>
  )
}
