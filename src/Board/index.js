import React, { useEffect, useState } from 'react'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { MessageBoard } from './MessageBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'
import { EndTurn } from './EndTurn'

import {
  BoardContainer,
  ActionSpace,
  NextTurn,
  AcceptTurn,
  ScreenCover
} from './style'

export const Board = ({ G, ctx, moves, isMultiplayer, isActive, playerID }) => {
  const [newPlayer, setNewPlayer] = useState(true)

  const currentPlayer = parseInt(ctx.currentPlayer)

  useEffect(() => {
    setNewPlayer(true)
  }, [currentPlayer])

  const isUnderAttack = G.battle?.attack?.title

  const handleDeckClick = () => {
    moves.startRound()
  }
  const handlePassClick = () => {
    isUnderAttack ? moves.doNotDefend() : moves.pass()
  }
  const handleCardClick = cardId => {
    moves.selectCard(cardId)
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

  const players = G.players.map((player, index) => {
    // show active player as current player if someone is under attack
    return (
      <PlayerSpace
        key={index}
        player={player}
        currentPlayer={isMultiplayer ? +playerID : currentPlayer}
        selectCard={handleCardClick}
        selectedCard={G.selectedCard}
        handleEmpireClick={handleEmpireClick}
        handleCityClick={handleCityClick}
        targetId={G.target.card?.id}
      />
    )
  })

  return (
    <BoardContainer>
      {newPlayer && !isMultiplayer ? (
        <ScreenCover>
          <NextTurn>
            {G.players[currentPlayer].color}
            's Turn
          </NextTurn>
          <AcceptTurn onClick={handleAcceptTurn}>Let's Go!</AcceptTurn>
        </ScreenCover>
      ) : (
        <>
          {players}
          <ActionSpace>
            <Deck onClick={handleDeckClick} />
            <MessageBoard
              G={G}
              ctx={ctx}
              isActive={isActive}
              isMultiplayer={isMultiplayer}
            />
            {ctx.phase === 'newRound' ? (
              <EndTurn onClick={handleEndTurn} />
            ) : (
              <Pass onClick={handlePassClick} isUnderAttack={isUnderAttack} />
            )}
            <BattleBoard
              cards={G.battle}
              handleDefenceClick={handleDefenceClick}
            />
          </ActionSpace>
        </>
      )}
    </BoardContainer>
  )
}
