import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'

import { CITY_COLORS } from './../../../constants'

const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 140px;
  width: 410px;
`
const Title = styled.h2`
  transform: rotate(180deg);
`
const City = styled.div`
  display: flex;
  flex-direction: column;
`
const Empire = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border: solid 1px black;
`

export const PlayerEmpire = ({ cards, handleEmpireClick, handleCityClick }) => {
  const cities = CITY_COLORS.map((color, index) => (
    <City key={index}>
      {cards
        .filter(card => card.color === color)
        .map((card, index) => (
          <Card
            key={index}
            value={card}
            faceUp={true}
            overlapIndex={index}
            handleCityClick={handleCityClick}
          />
        ))}
    </City>
  ))
  return (
    <Empire onClick={handleEmpireClick}>
      <Title>Empire</Title>
      <CitiesContainer>{cities}</CitiesContainer>
    </Empire>
  )
}
