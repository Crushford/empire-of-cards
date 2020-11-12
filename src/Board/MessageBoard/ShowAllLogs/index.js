import React, { useState } from 'react'
import styled from 'styled-components'

import { PopUpContent, Shade } from '../../common'

const ShowLog = styled.button`
  flex-grow: 1;
`

const LogList = styled.ol`
  color: white;
  margin: 20px;
  height: calc(100% - 5.17em);
  overflow-y: scroll;
`

export const ShowAllLogs = ({ log }) => {
  const [logOpen, setLogOpen] = useState(false)

  const openLog = () => {
    setLogOpen(true)
  }
  const closeLog = () => {
    setLogOpen(false)
  }
  return (
    <>
      <ShowLog onClick={openLog}>Show Entire Log</ShowLog>
      {logOpen && (
        <Shade onClick={closeLog}>
          <PopUpContent>
            <h3 id="customized-dialog-title">Entire Log</h3>
            <LogList>
              {log.map(message => (
                <li>{message}</li>
              ))}
            </LogList>
          </PopUpContent>
        </Shade>
      )}
    </>
  )
}
