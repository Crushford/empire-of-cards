import React from 'react'
import styled from 'styled-components'

const PassButton = styled.div`
  padding: 40px;
  border: solid 3px black;
  background: lightgreen;
`
export const Pass = ({ onClick, isUnderAttack }) => {
  return (
    <PassButton onClick={onClick}>
      {isUnderAttack ? 'Do Not Defend' : 'Pass'}
    </PassButton>
  )
}
