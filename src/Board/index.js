import React, { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'

import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './ActionSpace/BattleBoard'
import { MessageBoard } from './MessageBoard'
import { PlayerInfo } from './PlayerInfo'
import { GameOver } from './GameOver'
import { Deck } from './Deck'

import { EndTurn } from './EndTurn'
import { randomAiMove, checkIfPlayerHandIsAtCapacity } from '../utils'
import { GTAG_MANAGER_ID } from '../constants'
import { BoardContainer, NextTurn, AcceptTurn, ScreenCover } from './style'

export const Board = ({ G, ctx, moves, isMultiplayer, isActive, playerID }) => {
  const [newPlayer, setNewPlayer] = useState(false)

  const currentPlayerId = parseInt(ctx.currentPlayer)
  const viewingPlayer = G.isPractice
    ? 0
    : isMultiplayer
    ? +playerID
    : currentPlayerId

  const isViewersTurn = parseInt(viewingPlayer) === currentPlayerId

  useEffect(() => {
    if (ctx.turn === 0 || ctx.gameover) {
      const tagManagerArgs = {
        gtmId: GTAG_MANAGER_ID,
        events: {
          ...ctx
        }
      }
      TagManager.initialize(tagManagerArgs)
    }
  }, [ctx])

  useEffect(() => {
    if (
      G.isPractice &&
      ctx.currentPlayer > 0 &&
      !G.battle.waitingOnBattleResult
    ) {
      const randomMove = randomAiMove(G, ctx)
      setNewPlayer(false)

      // delay battle outcome to show attack  er and defender
      if (randomMove.move === 'doNotDefend') {
        moves.doNotDefend()
        setTimeout(() => moves.battleOutcome(), 3000)
      } else {
        moves[randomMove.move](...randomMove.args)
        if (randomMove.move === 'defendCity') {
          setTimeout(() => moves.battleOutcome(), 3000)
        }
      }
    }
  }, [currentPlayerId, G, ctx, moves])

  useEffect(() => {
    !G.isPractice && setNewPlayer(true)
  }, [currentPlayerId, G.isPractice])

  const isUnderAttack = G.battle?.attack?.title

  const handleDeckClick = () => {
    if (!isViewersTurn) return

    moves.startRound()
  }
  const handlePassClick = () => {
    if (!isViewersTurn) return

    if (ctx.phase === 'newRound') {
      moves.endTurn()
    }

    if (isUnderAttack) {
      moves.doNotDefend()
      setTimeout(() => moves.battleOutcome(), 3000)
    } else {
      moves.pass()
    }
  }
  const handleCardClick = cardId => {
    if (!isViewersTurn) return

    ctx.phase === 'play' && moves.selectCard(cardId)
    ctx.phase === 'newRound' && moves.retainCard(cardId)
  }
  const handleEmpireClick = () => {
    if (!isViewersTurn) return

    moves.moveToEmpire()
  }
  const handleCityClick = cityId => {
    if (!isViewersTurn) return

    moves.attackCity(cityId)
  }
  const handleDefenceClick = () => {
    if (!isViewersTurn) return

    moves.defendCity()
    setTimeout(() => moves.battleOutcome(), 3000)
  }
  const handleAcceptTurn = () => {
    if (!isViewersTurn) return

    setNewPlayer(false)
  }
  const showEndTurn = checkIfPlayerHandIsAtCapacity(G, ctx)

  const players = G.players.map((player, index) => (
    <PlayerSpace
      key={index}
      player={player}
      currentPlayer={viewingPlayer}
      selectCard={handleCardClick}
      selectedCard={G.selectedCard}
      handleEmpireClick={handleEmpireClick}
      handleCityClick={handleCityClick}
      targetId={G.target.card?.id}
      numberOfPlayers={G.players.length}
      retainingCardIds={G.retainingCardIds}
    />
  ))

  const playerInfoSections = G.players.map((player, index) => (
    <PlayerInfo
      key={index}
      player={player}
      playerName={'player' + index}
      playerDetails={player}
      currentPlayer={viewingPlayer}
      numberOfPlayers={G.players.length}
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
          {ctx.gameover && <GameOver G={G} ctx={ctx} />}
          {players}
          {playerInfoSections}
          <Deck onClick={handleDeckClick} cardsInDeck={G.deck.length} />
          <MessageBoard
            G={G}
            ctx={ctx}
            isActive={isActive}
            isMultiplayer={isMultiplayer}
          />
          {!G.battle.waitingOnBattleResult && isViewersTurn && (
            <EndTurn
              onClick={handlePassClick}
              isUnderAttack={isUnderAttack}
              showEndTurn={showEndTurn}
              phase={ctx.phase}
            />
          )}
          <BattleBoard
            battleDetails={G.battle}
            handleDefenceClick={handleDefenceClick}
          />
        </>
      )}
    </BoardContainer>
  )
}
