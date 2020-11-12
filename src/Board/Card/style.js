import styled from 'styled-components'

export const Container = styled.div`
  height: 100px;
  width: 71.42px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 1px;
  border: solid 1px black;
  background: ${({ faceUp }) =>
    faceUp
      ? 'white'
      : "white no-repeat center/100% url('https://filletfamilyblog.files.wordpress.com/2013/02/d0490860-0-large.jpg')"};
  z-index: ${({ overlapIndex }) => (overlapIndex ? -overlapIndex + 1 : 1)};
  ${({ overlapIndex }) => overlapIndex > 0 && 'margin-top:-100px'}
  ${({ isSelected }) => isSelected && 'box-shadow: 1px 1px 1px 5px yellow'}
  ${({ targetedCard }) => targetedCard && 'box-shadow: 1px 1px 1px 5px red'}
  ${({ isOnRetainedList }) =>
    isOnRetainedList && 'box-shadow: 1px 1px 1px 5px green'}
`

export const Title = styled.p`
  font-size: 14px;
  text-align: center;
  margin: auto;
`

export const CardImage = styled.img`
  height: 50%;
  max-width: 100%;
  object-fit: contain;
  box-sizing: border-box;
`

export const AttributesContainer = styled.div`
  font-size: 14px;
  margin: auto;
`

export const Banner = styled.div`
  height: 25%;
  ${({ top }) => !top && 'transform:rotate(180deg)'}
  width: 100%;
  background: ${({ color }) => color};
  display: flex;
  box-sizing: border-box;
`

export const CardText = styled.h5`
  height: 50%;
  max-width: 100%;
  object-fit: contain;
  font-size: 8px;
  padding: 7px;
  box-sizing: border-box;
`

export const CardEdge = styled.div`
  border: black solid 1px;
  z-index: -1;
  height: 100px;
  width: 71.42px;
  margin-right: -80px;
  background: white;
`
