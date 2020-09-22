import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card'

const Label = styled.h2``
const Container = styled.div`
  height: 220px;
  width: 240px;
  border: black solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const CardWithLabel = styled.div`
  height: 220px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border: black solid 1px;
`

export const BattleBoard = ({ attack, defend }) => {
  return (
    <Container>
      <CardWithLabel>
        <Label>Attack</Label>
        {attack && <Card value={attack} faceUp={false} />}
      </CardWithLabel>
      <CardWithLabel>
        <Label>Defend</Label>
        {defend && <Card value={defend} />}
      </CardWithLabel>
    </Container>
  )
}
