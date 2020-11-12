import React, { useState } from 'react'
import styled from 'styled-components'
import { PopUpContent, Shade } from '../../common'

const Message = styled.h5`
  color: white;
  margin-top: 30%;
`

export const SpecialMessage = ({ message }) => {
  const [open, setOpen] = useState(true)

  const closeLog = () => {
    setOpen(false)
  }
  return (
    <>
      {open && (
        <Shade onClick={closeLog}>
          <PopUpContent>
            <Message>{message}</Message>
          </PopUpContent>
        </Shade>
      )}
    </>
  )
}
