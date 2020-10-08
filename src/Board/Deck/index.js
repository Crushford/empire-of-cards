import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card'
import { CardEdge } from '../Card/style'

const Label = styled.h2``
const Container = styled.div`
  height: 220px;
  width: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: black solid 1px;
`
const Cards = styled.div`
  display: flex;
  flex-direction: row;
`
export const Deck = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <Label>Deck</Label>
      <Cards>
        <CardEdge />
        <CardEdge />
        <Card faceUp={false} />
      </Cards>
    </Container>
  )
}
