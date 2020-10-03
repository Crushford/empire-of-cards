import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getMessages } from './messages'

const Hint = styled.h5``
const SpecialMessage = styled.h5`
  color: blue;
`
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`

export const MessageBoard = ({ G, ctx }) => {
  const [messages, setMessages] = useState({ hint: '', specialMessage: '' })

  useEffect(() => {
    setMessages(getMessages(G, ctx))
  }, [G, ctx])

  return (
    <MessageContainer>
      <Hint>{messages.hint}</Hint>
      <SpecialMessage>{messages.specialMessage}</SpecialMessage>
    </MessageContainer>
  )
}
