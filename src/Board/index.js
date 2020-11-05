import React, { useEffect, useState } from 'react'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { MessageBoard } from './MessageBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'
import { EndTurn } from './EndTurn'

import { randomAiMove, checkIfPlayerHandIsAtCapacity } from '../utils'

import {
  BoardContainer,
  ActionSpace,
  NextTurn,
  AcceptTurn,
  ScreenCover
} from './style'

export const Board = ({ G, ctx, moves, isMultiplayer, isActive, playerID }) => {
  const [newPlayer, setNewPlayer] = useState(false)

  const currentPlayerId = parseInt(ctx.currentPlayer)

  useEffect(() => {
    if (G.isPractice && ctx.currentPlayer > 0) {
      const randomMove = randomAiMove(G, ctx)
      setNewPlayer(false)
      moves[randomMove.move](...randomMove.args)
    }
  }, [currentPlayerId, G, ctx, moves])

  useEffect(() => {
    !G.isPractice && setNewPlayer(true)
  }, [currentPlayerId, G.isPractice])

  const isUnderAttack = G.battle?.attack?.title

  const handleDeckClick = () => {
    moves.startRound()
  }
  const handlePassClick = () => {
    isUnderAttack ? moves.doNotDefend() : moves.pass()
  }
  const handleCardClick = cardId => {
    ctx.phase === 'play' && moves.selectCard(cardId)
    ctx.phase === 'newRound' && moves.retainCard(cardId)
  }
  const handleEmpireClick = () => {
    moves.moveToEmpire()
  }
  const handleCityClick = cityId => {
    moves.attackCity(cityId)
  }
  const handleDefenceClick = () => {
    moves.defendCity()
  }
  const handleAcceptTurn = () => {
    setNewPlayer(false)
  }
  const handleEndTurn = () => {
    moves.endTurn()
  }
  const newGame = () => document.location.reload()

  const showEndTurn = checkIfPlayerHandIsAtCapacity(G, ctx)

  const players = G.players.map((player, index) => (
    <PlayerSpace
      key={index}
      player={player}
      currentPlayer={isMultiplayer ? +playerID : currentPlayerId}
      selectCard={handleCardClick}
      selectedCard={G.selectedCard}
      handleEmpireClick={handleEmpireClick}
      handleCityClick={handleCityClick}
      targetId={G.target.card?.id}
      numberOfPlayers={G.players.length}
      retainingCardIds={G.retainingCardIds}
    />
  ))

  return (
    <BoardContainer>
      {newPlayer && !isMultiplayer ? (
        <ScreenCover>
          <NextTurn>
            {G.players[currentPlayerId].color}
            's Turn
          </NextTurn>
          <AcceptTurn onClick={handleAcceptTurn}>Let's Go!</AcceptTurn>
        </ScreenCover>
      ) : (
        <>
          {players}
          {ctx.gameover ? (
            <ActionSpace>
              <h1>
                Game Over!
                <br />
                {G.players[ctx.gameover.winner].color} Wins! <br />
                {parseInt(ctx.currentPlayer) === parseInt(ctx.gameover.winner)
                  ? 'Congratulations!'
                  : 'Better Luck Next Time'}
              </h1>
              <p>
                Thanks for playing, Empire of Cards is still a work in progress,
                would you mind sending some feedback on the game?
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
            </ActionSpace>
          ) : (
            <ActionSpace>
              <Deck onClick={handleDeckClick} />
              <MessageBoard
                G={G}
                ctx={ctx}
                isActive={isActive}
                isMultiplayer={isMultiplayer}
              />
              {ctx.phase === 'newRound' ? (
                showEndTurn && <EndTurn onClick={handleEndTurn} />
              ) : (
                <Pass onClick={handlePassClick} isUnderAttack={isUnderAttack} />
              )}
              <BattleBoard
                cards={G.battle}
                handleDefenceClick={handleDefenceClick}
              />
            </ActionSpace>
          )}
        </>
      )}
    </BoardContainer>
  )
}
