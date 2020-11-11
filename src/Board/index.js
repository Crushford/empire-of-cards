import React, { useEffect, useState } from 'react'
import TagManager from 'react-gtm-module'

import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { MessageBoard } from './MessageBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'
import { EndTurn } from './EndTurn'
import { randomAiMove, checkIfPlayerHandIsAtCapacity } from '../utils'
import { GTAG_MANAGER_ID } from '../constants'
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
    isViewersTurn && moves.startRound()
  }
  const handlePassClick = () => {
    if (isViewersTurn) {
      if (isUnderAttack) {
        moves.doNotDefend()
        setTimeout(() => moves.battleOutcome(), 3000)
      } else {
        moves.pass()
      }
    }
  }
  const handleCardClick = cardId => {
    if (isViewersTurn) {
      ctx.phase === 'play' && moves.selectCard(cardId)
      ctx.phase === 'newRound' && moves.retainCard(cardId)
    }
  }
  const handleEmpireClick = () => {
    isViewersTurn && moves.moveToEmpire()
  }
  const handleCityClick = cityId => {
    isViewersTurn && moves.attackCity(cityId)
  }
  const handleDefenceClick = () => {
    if (isViewersTurn) {
      moves.defendCity()
      setTimeout(() => moves.battleOutcome(), 3000)
    }
  }
  const handleAcceptTurn = () => {
    isViewersTurn && setNewPlayer(false)
  }
  const handleEndTurn = () => {
    isViewersTurn && moves.endTurn()
  }
  const newGame = () => document.location.reload()

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
                    <Pass
                      onClick={handlePassClick}
                      isUnderAttack={isUnderAttack}
                    />
                  )}
                </>
              )}
              <BattleBoard
                battleDetails={G.battle}
                handleDefenceClick={handleDefenceClick}
              />
            </ActionSpace>
          )}
        </>
      )}
    </BoardContainer>
  )
}
