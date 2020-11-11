import styled from 'styled-components'

export const BoardContainer = styled.div`
  display: grid;
  background: #f5f5f5;
  position: fixed;
  top: calc(50% - (100vw * 0.5625) / 2);
  left: 0;
  height: calc(100vw * 0.5625);
  width: 100vw;
  grid-template-columns: repeat(32, minmax(3.125%, 3.125%));
  grid-template-rows: repeat(18, minmax(5.55%, 5.55%));
  grid-template-areas:
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    'player1 player1 player1 player1 player1 player1 . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . . . . . . . . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck . . . . . . . . . . . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck . . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . player3 player3 player3 player3 player3 player3'
    '. . . . . . . . . . . . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .'
    '. . . . . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .'
    '. . . . . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .'
    '. . . . . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .'
    '. . . . . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .';
`

export const GameOver = styled.div`
  height: 30%;
  width: 30%;
  background-color: 'black';
  position: fixed;
  top: calc(100% - (30% / 2));
  left: calc(100% - (30% / 2));
  z-index: 2;
`
export const NextTurn = styled.h1``
export const AcceptTurn = styled.button`
  padding: 15px;
`

export const ScreenCover = styled.div`
  z-index: 2;
`
