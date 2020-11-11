import React from 'react'
import styled from 'styled-components'
import { Card } from '../../ActionSpace/Card'

import { CITY_COLORS } from './../../../constants'

const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 160px;
  border: solid black 1px;
  border-radius: 10px;
`
const Title = styled.h2`
  margin: auto;
  margin-bottom: -13px;
  background: white;
  z-index: 1;
  width: fit-content;
`
const City = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
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
  height: 50%;
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
