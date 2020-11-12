import React, { useState } from 'react'
import styled from 'styled-components'

const LatestMessages = styled.h5`
  color: purple;
  margin: 3px;
`

const Logs = styled.div`
  flex-grow: 3;
  overflow: hidden;
`

const FadeOut = styled.div`
  background: linear-gradient(to bottom, transparent, rgb(245, 245, 245));
  z-index: 2;
  height: 70px;
  margin-top: -70px;
`

export const BattleLog = ({ log }) => {
  return (
    <>
      <Logs>
        <LatestMessages>
          Latest Battle Update: {log[log.length - 1]}
        </LatestMessages>
        {log[log.length - 2] && (
          <LatestMessages>{log[log.length - 2]}</LatestMessages>
        )}
        {log[log.length - 3] && (
          <LatestMessages>{log[log.length - 3]}</LatestMessages>
        )}
        {log[log.length - 4] && (
          <LatestMessages>{log[log.length - 4]}</LatestMessages>
        )}
      </Logs>
      {log.length > 2 && <FadeOut />}
    </>
  )
}
