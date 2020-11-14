import styled from 'styled-components'

const backgroundImageUrl =
  'https://s3-alpha-sig.figma.com/img/8d30/b062/75523d18d0f1477ac4548e193b208810?Expires=1606089600&Signature=c-k6a1DHf7uhb0t-P8oiyqL6nkNU8gPTtt~Q9h1lrMI2Yt0fUIwc5vaELj3ormkjE7v9VCyNlcRq7NXgMdg3qx-nWLvmtguFaCV3XQ6dWo~cdkkBMXOBr9boYIAEBHlKezIyqo2YSHokQLdX-uH-NwwXSLMvPujMrrnHl-e7GF2nnEgNzcg5x5dQBLrA39z5MHtL4R67KjoIHnlyigbc1G6g-a3WGqZVMCYcgnPCeOkZrmgCe8d139YtPCHhpZ5uiKavMfzyGVdLkTgUM9eAsHILDX936G-gQXaf-RsoAoenFjiKucSFeuJN-zgnBBWnhV5lPqxRssY5e9WOEtRIRg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'

export const BoardContainer = styled.div`
  display: grid;
  overflow: hidden;
  background: linear-gradient(black, transparent, black),
    linear-gradient(90deg, black, transparent, black),
    url(${backgroundImageUrl});
  background-size: 100% 100%;
  position: fixed;
  top: calc(50% - (100vw * 0.5625) / 2);
  left: 0;
  height: calc(100vw * 0.5625);
  width: 100vw;
  grid-template-columns: repeat(32, minmax(3.125%, 3.125%));
  grid-template-rows: repeat(18, minmax(5.556%, 5.556%));
  grid-template-areas:
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    '. playerInfo1 playerInfo1 playerInfo1 . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . playerInfo2 playerInfo2 playerInfo2 . . . . . . . .'
    '. playerInfo1 playerInfo1 playerInfo1 . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . playerInfo2 playerInfo2 playerInfo2 . . . . . . . .'
    '. playerInfo1 playerInfo1 playerInfo1 . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . playerInfo2 playerInfo2 playerInfo2 . . . . . . . .'
    '. . . . . . . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . . . . . . .'
    'player1 player1 player1 player1 player1 player1 . . . . . . player2 player2 player2 player2 player2 player2 player2 player2 . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . . . . . . . . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . . . . . . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck deck . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck deck . . . battleSpace battleSpace battleSpace battleSpace . . endTurnButton endTurnButton endTurnButton . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck deck . . . . . . . . . . . . . . . player3 player3 player3 player3 player3 player3'
    'player1 player1 player1 player1 player1 player1 . deck deck deck deck . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . player3 player3 player3 player3 player3 player3'
    '. . . . . . . . . . . . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .'
    '. playerInfo0 playerInfo0 playerInfo0 . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . playerInfo3 playerInfo3 playerInfo3 . .'
    '. playerInfo0 playerInfo0 playerInfo0 . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . playerInfo3 playerInfo3 playerInfo3 . .'
    '. playerInfo0 playerInfo0 playerInfo0 . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . playerInfo3 playerInfo3 playerInfo3 . .'
    '. . . . . messageBoard messageBoard messageBoard messageBoard messageBoard messageBoard . player0 player0 player0 player0 player0 player0 player0 player0 . . . . . . . . . . . .';
`

export const NextTurn = styled.h1`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`
export const AcceptTurn = styled.button`
  padding: 15px;
`

export const ScreenCover = styled.div`
  z-index: 2;
`
