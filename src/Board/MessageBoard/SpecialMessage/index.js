import React, { useState } from 'react'
import styled from 'styled-components'
import { PopUpContent, Shade } from '../../common'

const Message = styled.h5`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
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
