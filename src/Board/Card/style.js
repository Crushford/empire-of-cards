import styled from 'styled-components'

export const Container = styled.div`
  height: 140px;
  width: 100px;
  border-radius: 10%;
  overflow: hidden;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-right: 1px;
  background: white;
  border: solid 1px black;
  background: ${({ faceUp }) =>
    faceUp
      ? 'white'
      : "no-repeat center/100% url('https://filletfamilyblog.files.wordpress.com/2013/02/d0490860-0-large.jpg')"};
`

export const TopBanner = styled.div`
  height: 40px;
  width: 100%;
  background: ${({ color }) => color};
  display: flex;
`
export const Title = styled.p`
  font-size: 14px;
  height: 100%;
  text-align: center;
  margin: auto;
`

export const CardImage = styled.img`
  height: 100%;
  max-width: 100%;
`

export const AttributesContainer = styled.div`
  font-size: 14px;
  width: 28px;
  margin: 1px;
`

export const CardHalfContainer = styled.div`
  max-height: 50%;
  ${({ top }) => !top && 'transform:rotate(180deg)'}
`
