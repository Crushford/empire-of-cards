import React from 'react'
import styled from 'styled-components'
import { Card } from '../ActionSpace/Card'
import { CardEdge } from '../ActionSpace/Card/style'

const Title = styled.h2`
  margin: 2px;
`
const Information = styled.p`
  margin: 2px;
`
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: black solid 1px;
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
