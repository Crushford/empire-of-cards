import React from 'react'
import {
  Container,
  TopBanner,
  Title,
  CardImage,
  AttributesContainer,
  CardHalfContainer
} from './style'

const Attributes = ({ attack, defence }) => {
  return (
    <AttributesContainer>
      <span role="img" aria-label="attack value">
        ⚔️
      </span>
      {attack}
      <span role="img" aria-label="defence value">
        🛡️
      </span>
      {defence}
    </AttributesContainer>
  )
}

const CardHalf = ({ top, card: { title, attack, defence, color } }) => (
  <CardHalfContainer top={top}>
    <TopBanner color={color}>
      <Title>{title}</Title>
      {attack && defence && (
        <Attributes attack={attack} defence={defence}></Attributes>
      )}
    </TopBanner>
  </CardHalfContainer>
)

export const Card = ({ faceUp, value }) => {
  return (
    <Container faceUp={faceUp}>
      {faceUp && (
        <>
          <CardHalf top={true} card={value} />
          <CardImage src={value.imageUrl} />
          <CardHalf card={value} />
        </>
      )}
    </Container>
  )
}
