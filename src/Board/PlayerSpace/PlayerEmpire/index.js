import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'

import { CITY_COLORS } from './../../../constants'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const City = styled.div`
  display: flex;
  flex-direction: column;
`

export const PlayerEmpire = ({ cards }) => {
  const cities = CITY_COLORS.map((color, index) => (
    <City key={index}>
      {cards
        .filter(card => card.color === color)
        .map((card, index) => (
          <Card key={index} value={card} faceUp={true} overlapIndex={index} />
        ))}
    </City>
  ))
  return <Container>{cities}</Container>
}
