import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card'

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
const CardEdge = styled.div`
  border: black solid 1px;
  z-index: -1;
  height: 140px;
  width: 100px;
  border-radius: 10%;
  overflow: hidden;
  margin-right: -97px;
`
export const Deck = () => {
  return (
    <Container>
      <Label>Deck</Label>
      <Cards>
        <CardEdge />
        <CardEdge />
        <Card faceUp={false} />
      </Cards>
    </Container>
  )
}
