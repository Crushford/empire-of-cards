import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 140px;
  width: 100px;
  border-radius: 10%;
  background: no-repeat center/100%
    ${({ faceUp }) =>
      !faceUp &&
      "url('https://filletfamilyblog.files.wordpress.com/2013/02/d0490860-0-large.jpg')"};
`

export const Card = ({ faceUp }) => {
  return <Container faceUp={faceUp}></Container>
}
