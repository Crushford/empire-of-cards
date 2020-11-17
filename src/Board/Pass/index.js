import React from 'react'
import styled from 'styled-components'

const PassButton = styled.button`
  padding: 40px;
  background: lightblue;
  grid-area: PassButton;
`
export const Pass = ({ onClick, isUnderAttack }) => {
  const message = isUnderAttack ? 'Do Not Defend' : 'Pass'

  return message && <PassButton onClick={onClick}>{message}</PassButton>
}
