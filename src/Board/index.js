import React from 'react'
import styled from 'styled-components'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { Deck } from './Deck'
import { Pass } from './Pass'

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`
const ActionSpace = styled.div`
  flex-grow: 1;
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`

export const Board = props => {
  // let winner = ''
  // if (props.ctx.gameover) {
  //   winner =
  //     props.ctx.gameover.winner !== undefined ? (
  //       <div id="winner">Winner: {props.ctx.gameover.winner}</div>
  //     ) : (
  //       <div id="winner">Draw!</div>
  //     )
  // }
  const isUnderAttack = props.G.battle?.attack?.title

  const handleDeckClick = () => {
    props.moves.startRound()
  }
  const handlePassClick = () => {
    isUnderAttack ? props.moves.doNotDefend() : props.moves.pass()
  }
  const handleCardClick = cardId => {
    props.moves.selectCard(cardId)
  }
  const handleEmpireClick = () => {
    props.moves.moveToEmpire()
  }
  const handleCityClick = cityId => {
    props.moves.attackCity(cityId)
  }
  const handleDefenceClick = () => {
    props.moves.defendCity()
  }

  const players = props.G.players.map((player, index) => {
    const isCurrentPlayer = props.ctx.playOrderPos === index

    return (
      <PlayerSpace
        key={index}
        playerNumber={index}
        player={player}
        isCurrentPlayer={isCurrentPlayer}
        selectCard={handleCardClick}
        selectedCard={props.G.selectedCard}
        handleEmpireClick={handleEmpireClick}
        handleCityClick={handleCityClick}
      />
    )
  })

  return (
    <BoardContainer>
      {players}
      <ActionSpace>
        <Deck onClick={handleDeckClick} />
        <Pass onClick={handlePassClick} isUnderAttack={isUnderAttack} />
        <BattleBoard
          cards={props.G.battle}
          handleDefenceClick={handleDefenceClick}
        />
      </ActionSpace>
    </BoardContainer>
  )
}
