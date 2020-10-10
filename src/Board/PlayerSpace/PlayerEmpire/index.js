import React from 'react'
import styled from 'styled-components'
import { Card } from '../../Card'

import { CITY_COLORS } from './../../../constants'

const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 250px;
`
const Title = styled.h2``
const City = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &:hover {
    overflow: visible;
  }
  &:last-child {
    overflow: visible;
  }
`
const CardWrapper = styled.div`
  overflow: hidden;
  &:hover {
    overflow: visible;
  }
  &:last-child {
    overflow: visible;
  }
`
const Empire = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  height: 240px;
  margin-bottom: -10px;
`

export const PlayerEmpire = ({
  cards,
  handleEmpireClick,
  handleCityClick,
  targetId
}) => {
  const cityStacks = CITY_COLORS.map(color =>
    cards.filter(card => card.color === color)
  ).sort((a, b) => a.length - b.length)
  const cities = cityStacks.map(
    (cityColor, index) =>
      cityColor[0] && (
        <City key={index}>
          {cityColor.map(card => (
            <CardWrapper>
              <Card
                key={card.id}
                value={card}
                faceUp={true}
                handleCityClick={handleCityClick}
                targetId={targetId}
              />
            </CardWrapper>
          ))}
        </City>
      )
  )
  return (
    <Empire onClick={handleEmpireClick}>
      <Title>Empire</Title>
      <CitiesContainer>{cities}</CitiesContainer>
    </Empire>
  )
}
