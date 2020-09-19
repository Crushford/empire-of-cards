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

export const Deck = () => {
  return (
    <Container>
      <Label>Deck</Label>
      <Card faceUp={false} />
    </Container>
  )
}
