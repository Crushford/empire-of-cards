import React, { useState } from 'react'
import styled from 'styled-components'

const FullLog = styled.div`
  height: 30%;
  width: 30%;
  background-color: 'black';
  position: fixed;
  top: calc(100% - (30% / 2));
  left: calc(100% - (30% / 2));
  z-index: 2;
`

const Shade = styled.div`
  height: 100vh;
  width: 100vw;
  filter: blur(4px);
  position: fixed;
  z-index: 1;
`

const LatestMessages = styled.h5`
  color: purple;
  margin: 3px;
`
const ShowLog = styled.button``

const LogList = styled.ol`
  margin: 20px;
  max-height: 300px;
  overflow-y: scroll;
`

export const BattleLog = ({ log }) => {
  const [logOpen, setLogOpen] = useState(false)

  const openLog = () => {
    setLogOpen(true)
  }
  const closeLog = () => {
    setLogOpen(false)
  }
  return (
    <>
      {log[log.length - 4] && (
        <LatestMessages>{log[log.length - 4]}</LatestMessages>
      )}
      {log[log.length - 3] && (
        <LatestMessages>{log[log.length - 3]}</LatestMessages>
      )}
      {log[log.length - 2] && (
        <LatestMessages>{log[log.length - 2]}</LatestMessages>
      )}
      <LatestMessages>
        Latest Battle Update: {log[log.length - 1]}
      </LatestMessages>
      <ShowLog onClick={openLog}>Show Entire Log</ShowLog>
      {logOpen && (
        <Shade onclick={closeLog}>
          <FullLog open={logOpen}>
            <h3 id="customized-dialog-title">Entire Log</h3>
            <LogList>
              {log.map(message => (
                <li>{message}</li>
              ))}
            </LogList>
          </FullLog>
        </Shade>
      )}
    </>
  )
}
