import React from 'react'
import styled from 'styled-components'
import { Card } from '../common/Card'
import { VerticalBorder } from '../common'

const SectionTitle = styled.h2`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`

const BonusInformation = styled.h4`
  color: 'red';
`

const Container = styled.div`
  grid-area: battleSpace;
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
`

export const BattleBoard = ({
  battleDetails: {
    attack,
    defend,
    attackBonus,
    defenceBonus,
    waitingOnBattleResult
  },
  handleDefenceClick
}) => {
  return (
    <Container>
      <CardWithLabel>
        <SectionTitle>Attack</SectionTitle>
        {attack.id && (
          <Card value={attack} faceUp={Boolean(waitingOnBattleResult)} />
        )}
        {attackBonus > 0 && (
          <BonusInformation>Bonus +1 Attack</BonusInformation>
        )}
      </CardWithLabel>
      <VerticalBorder />
      <CardWithLabel onClick={handleDefenceClick}>
        <SectionTitle>Defend</SectionTitle>
        {defend.id && <Card value={defend} faceUp={true} />}
        {defenceBonus > 0 && (
          <BonusInformation>Bonus +1 Defence</BonusInformation>
        )}
      </CardWithLabel>
    </Container>
  )
}
