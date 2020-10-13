import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`
export const ActionSpace = styled.div`
  flex-grow: 1;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  position: fixed;
  top: calc(50% - (250px / 2));
  height: 250px;
  z-index: 1;
`
export const NextTurn = styled.h1`
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 300px; /* Need a specific value to work */
`
export const AcceptTurn = styled.button`
  position: absolute;
  top: 60%;
  padding: 20px 0px 20px 0px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 300px; /* Need a specific value to work */
`

export const ScreenCover = styled.div`
  z-index: 2;
`
