import styled from 'styled-components'

export const PopUpContent = styled.div`
  height: 30%;
  width: 30%;
  background-color: black;
  position: fixed;
  top: calc(50% - (30% / 2));
  left: calc(50% - (30% / 2));
  z-index: 2;
`

export const Shade = styled.div`
  height: 100vh;
  width: 100vw;
  background: radial-gradient(transparent, black);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`
export const VerticalBorder = styled.div`
  height: 100%;
  width: 30px;
  background: url(${process.env.PUBLIC_URL}/v-separator.svg);
  background-repeat: no-repeat;
  background-position: center;
`

export const HorizontalBorder = styled.div`
  height: 30px;
  width: 100%;
  background: url(/h-separator.svg) center center no-repeat;
  margin-bottom: -2.5%;
`
