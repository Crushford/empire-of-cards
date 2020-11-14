import React from 'react'
import styled from 'styled-components'
import { Card } from '../../common/Card'
import { HorizontalBorder } from '../../common'

import { CITY_COLORS } from './../../../constants'

const CitiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 160px;
  background: linear-gradient(
    269.93deg,
    rgba(255, 255, 255, 0) 0.04%,
    rgba(251, 251, 251, 0.39) 38.14%,
    rgba(252, 252, 252, 0.280564) 63.25%,
    rgba(255, 255, 255, 0) 99.93%
  );
`
const Title = styled.h2`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
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
      <HorizontalBorder />
      <CitiesContainer>{cities}</CitiesContainer>
    </Empire>
  )
}
