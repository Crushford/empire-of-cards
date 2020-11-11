import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 30%;
  width: 30%;
  background-color: 'black';
  position: fixed;
  top: calc(100% - (30% / 2));
  left: calc(100% - (30% / 2));
  z-index: 2;
`
const NewGame = styled.button`
  padding: 15px;
`

export const GameOver = ({ G, ctx }) => {
  const newGame = () => document.location.reload()
  return (
    <Container>
      <h1>
        Game Over!
        <br />
        {G.players[ctx.gameover.winner].color} Wins! <br />
        {parseInt(ctx.currentPlayer) === parseInt(ctx.gameover.winner)
          ? 'Congratulations!'
          : 'Better Luck Next Time'}
      </h1>
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
    </Container>
  )
}
