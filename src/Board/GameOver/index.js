import React from 'react'
import styled from 'styled-components'
import { Shade, PopUpContent } from '../common'
import { getPlayerName } from '../../utils'

const NewGame = styled.button`
  padding: 15px;
`
const Title = styled.h2`
  ${({ theme }) => theme.headingsTypography}
  color:${({ theme }) => theme.primaryTextColor};
`
export const GameOver = ({ G, ctx, isMultiplayer, matchData }) => {
  const newGame = () => document.location.reload()
  return (
    <Shade>
      <PopUpContent>
        <Title>
          Game Over!{' '}
          {getPlayerName({
            index: ctx.gameover.winner,
            isPractice: G.isPractice,
            isMultiplayer,
            matchData
          })}{' '}
          Wins! <br />
          {parseInt(ctx.currentPlayer) === parseInt(ctx.gameover.winner)
            ? 'Congratulations!'
            : 'Better Luck Next Time'}
        </Title>
        <p>
          Thanks for playing, Empire of Cards is still a work in progress, would
          you mind sending some feedback on the game?
          <br />
          <a
            href={`https://docs.google.com/forms/d/e/1FAIpQLSfK6zgugtFf0Lw3YVHjIannTkrY3LOWi2A9TIBeSoiHnH4-Tw/viewform?usp=pp_url&entry.661267773=${
              ctx.numPlayers
            }&entry.885079316=${
              G.isMultiplayer ? 'Multiplayer' : 'Single+Player'
            }&entry.993122104=${ctx.turn}`}
          >
            Here is the link to the form
          </a>
        </p>
        <NewGame onClick={newGame}>New Game</NewGame>
      </PopUpContent>
    </Shade>
  )
}
