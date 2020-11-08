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

export const BattleBoard = ({
  cards: { attack, defend },
  handleDefenceClick
}) => {
  return (
    <Container>
      <CardWithLabel>
        <Label>Attack</Label>
        {attack.id && <Card value={attack} faceUp={Boolean(defend.id)} />}
      </CardWithLabel>
      <CardWithLabel onClick={handleDefenceClick}>
        <Label>Defend</Label>
        {defend.id && <Card value={defend} faceUp={true} />}
      </CardWithLabel>
    </Container>
  )
}
