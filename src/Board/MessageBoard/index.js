import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getMessages } from './messages'
import { BattleLog } from './BattleLog'
import { ShowAllLogs } from './ShowAllLogs'
import { SpecialMessage } from './SpecialMessage'

const Turn = styled.h5`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor}
  flex-grow: 1;
`
const Hint = styled.h5`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`

const InstructionContainer = styled.div`
  flex-grow: 1;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: messageBoard;
  box-sizing: border-box;
  height: 100%;
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
      <InstructionContainer>
        {(!isMultiplayer || isActive) && <Hint>{messages.hint}</Hint>}
      </InstructionContainer>
      <BattleLog log={G.log} />
      <ShowAllLogs log={G.log} />
      {messages.specialMessage && (
        <SpecialMessage message={messages.specialMessage} />
      )}
    </MessageContainer>
  )
}
