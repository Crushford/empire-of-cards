import React from 'react'
import styled from 'styled-components'

export const ActionSpaceContainer = styled.div`
  flex-grow: 1;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  position: fixed;
  top: calc(50% - (60% / 2));
  height: 60%;
  z-index: 0;
  background-color: #f5f5f5;
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
export const ActionSpace = ({ G, ctx }) => (
  <ActionSpaceContainer>
    {ctx.gameover ? (
      <>
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
        <AcceptTurn onClick={newGame}>New Game</AcceptTurn>
      </>
    ) : (
      <>
        <Deck onClick={handleDeckClick} cardsInDeck={G.deck.length} />
        <MessageBoard
          G={G}
          ctx={ctx}
          isActive={isActive}
          isMultiplayer={isMultiplayer}
        />
        {!G.battle.waitingOnBattleResult && isViewersTurn && (
          <>
            {ctx.phase === 'newRound' ? (
              showEndTurn && <EndTurn onClick={handleEndTurn} />
            ) : (
              <Pass onClick={handlePassClick} isUnderAttack={isUnderAttack} />
            )}
          </>
        )}
        <BattleBoard
          battleDetails={G.battle}
          handleDefenceClick={handleDefenceClick}
        />
      </>
    )}
  </ActionSpaceContainer>
)
