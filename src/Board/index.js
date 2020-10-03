import React, { useEffect, useState } from 'react'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { MessageBoard } from './MessageBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'
import { EndTurn } from './EndTurn'

import { BoardContainer, ActionSpace, NextTurn, AcceptTurn } from './style'

export const Board = ({ G, ctx, moves, isMultiplayer, isActive }) => {
  const [newPlayer, setNewPlayer] = useState(true)

  useEffect(() => {
    setNewPlayer(true)
  }, [ctx.currentPlayer])

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
    const isCurrentPlayer = ctx.playOrderPos === index

    return (
      <PlayerSpace
        key={index}
        playerNumber={index}
        player={player}
        isCurrentPlayer={isCurrentPlayer}
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
        <>
          <NextTurn> {G.players[ctx.currentPlayer].color}'s Turn</NextTurn>
          <AcceptTurn onClick={handleAcceptTurn}>Let's Go!</AcceptTurn>
        </>
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
            <Pass onClick={handlePassClick} isUnderAttack={isUnderAttack} />
            <EndTurn onClick={handleEndTurn} />
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
