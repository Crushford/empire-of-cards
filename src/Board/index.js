import React, { useEffect, useState } from 'react'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { MessageBoard } from './MessageBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'
import { EndTurn } from './EndTurn'

import { randomAiMove } from '../utils'

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

  const additionalHandAllowance = G.players[currentPlayerId].empire.filter(
    card => card.benefit === 'handCapacity'
  ).length

  const showEndTurn =
    G.players[currentPlayerId].hand.length ===
    G.normalHandSizeAllowance + additionalHandAllowance

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
            <>
              <NextTurn>Game Over!</NextTurn>
              <AcceptTurn onClick={newGame}>New Game</AcceptTurn>
            </>
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
