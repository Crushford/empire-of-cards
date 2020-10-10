import styled from 'styled-components'

export const Container = styled.div`
  height: 140px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 1px;
  background: white;
  border: solid 1px black;
  background: ${({ faceUp }) =>
    faceUp
      ? 'white'
      : "white no-repeat center/100% url('https://filletfamilyblog.files.wordpress.com/2013/02/d0490860-0-large.jpg')"};
  z-index: ${({ overlapIndex }) => (overlapIndex ? -overlapIndex + 1 : 1)};
  ${({ overlapIndex }) => overlapIndex > 0 && 'margin-top:-100px'}
  ${({ selectedCard }) => selectedCard && 'box-shadow: 1px 1px 1px 5px yellow'}
  ${({ targetedCard }) => targetedCard && 'box-shadow: 1px 1px 1px 5px red'}
`

export const TopBanner = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ color }) => color};
  display: flex;
`
export const Title = styled.p`
  font-size: 14px;
  text-align: center;
  margin: auto;
`

export const CardImage = styled.img`
  max-height: 60%;
  max-width: 100%;
  object-fit: contain;
`

export const AttributesContainer = styled.div`
  font-size: 14px;
  margin: auto;
`

export const CardHalfContainer = styled.div`
  height: 20%;
  ${({ top }) => !top && 'transform:rotate(180deg)'}
`

export const CardText = styled.h5`
  height: 100%;
  max-width: 100%;
  transform: rotate(180deg);
  font-size: 8px;
  padding: 7px;
`

export const CardEdge = styled.div`
  border: black solid 1px;
  z-index: -1;
  height: 140px;
  width: 100px;
  margin-right: -97px;
  background: white;
`
