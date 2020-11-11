import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getMessages } from './messages'
import { BattleLog } from './BattleLog'

const Turn = styled.h5`
  color: ${({ isActive }) => (isActive ? 'green' : 'red')};
`
const Hint = styled.h5``
const SpecialMessage = styled.h5`
  color: blue;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  grid-area: messageBoard;
`

export const MessageBoard = ({ G, ctx, isMultiplayer, isActive }) => {
  const [messages, setMessages] = useState({ hint: '', specialMessage: '' })

  useEffect(() => {
    setMessages(getMessages(G, ctx))
  }, [G, ctx, isActive])

  return (
    <MessageContainer>
      {isMultiplayer && (
        <Turn isActive={isActive}>
          {isActive ? 'Your Turn' : "Opponent's Turn"}
        </Turn>
      )}
      {(!isMultiplayer || isActive) && (
        <>
          <Hint>{messages.hint}</Hint>
          {messages.specialMessage && (
            <SpecialMessage>{messages.specialMessage}</SpecialMessage>
          )}
        </>
      )}
      <BattleLog log={G.log} />
    </MessageContainer>
  )
}
