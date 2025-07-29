import React, { useState } from 'react'
import styled from 'styled-components'

const LatestMessages = styled.h5`
  color: purple;
  margin: 3px;
`

const ShowLog = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }
`

const LogList = styled.ol`
  margin: 20px;
  max-height: 300px;
  overflow-y: scroll;
`

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const DialogContent = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
`

const DialogTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #666;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`

const DialogBody = styled.div`
  padding: 0;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
`

export const BattleLog = ({ log }) => {
  const [logOpen, setLogOpen] = useState(false)

  const openLog = () => {
    setLogOpen(true)
  }

  const closeLog = () => {
    setLogOpen(false)
  }

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeLog()
    }
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
        <DialogOverlay onClick={handleOverlayClick}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Entire Log</DialogTitle>
              <CloseButton onClick={closeLog} aria-label="close">
                ×
              </CloseButton>
            </DialogHeader>
            <DialogBody>
              <LogList>
                {log.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </LogList>
            </DialogBody>
          </DialogContent>
        </DialogOverlay>
      )}
    </>
  )
}
