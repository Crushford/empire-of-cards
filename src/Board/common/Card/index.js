import React from 'react'
import {
  Container,
  Banner,
  Title,
  CardImage,
  AttributesContainer,
  CardText
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
  <Banner top={top} color={color}>
    <Title>{title}</Title>
    {attack && defence && (
      <Attributes attack={attack} defence={defence}></Attributes>
    )}
  </Banner>
)

export const Card = ({
  faceUp,
  value,
  overlapIndex,
  selectCard,
  selectedCard,
  handleCityClick,
  targetId,
  isOnRetainedList,
  rotation
}) => {
  const handleClick = () => {
    faceUp && value?.id && handleCityClick && handleCityClick(value.id)
    faceUp && value?.id && selectCard && selectCard(value.id)
  }

  return (
    <Container
      faceUp={faceUp}
      overlapIndex={overlapIndex}
      onClick={handleClick}
      isOnRetainedList={isOnRetainedList}
      isSelected={faceUp && selectedCard === value?.id}
      targetedCard={targetId && targetId === value?.id}
      rotation={rotation}
    >
      {faceUp && (
        <>
          <CardHalf top={true} card={value} />
          {value.text ? (
            <CardText>{value.text}</CardText>
          ) : (
            <CardImage src={value.imageUrl} />
          )}
          <CardHalf card={value} />
        </>
      )}
    </Container>
  )
}
