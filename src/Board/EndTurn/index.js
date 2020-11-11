import React from 'react'
import styled from 'styled-components'

const EndTurnButton = styled.button`
  padding: 40px;
  border: solid 3px black;
  background: lightblue;
`
export const EndTurn = ({ onClick }) => {
  return <EndTurnButton onClick={onClick}>End Turn</EndTurnButton>
}
