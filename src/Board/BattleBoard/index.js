import React from 'react'
import styled from 'styled-components'
import { Card } from '../Card'

const SectionTitle = styled.h2``

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

const Border = styled.div`
  height: 100%;
  border-right: 1px solid red;
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
      <Border />
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
