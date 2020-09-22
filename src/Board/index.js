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
  const handleDeckClick = () => {
    props.moves.startRound()
  }
  const handlePassClick = () => {
    props.moves.pass()
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

  const players = props.G.players.map((player, index) => {
    return (
      <PlayerSpace
        key={index}
        playerNumber={index}
        player={player}
        currentPlayer={props.ctx.playOrderPos === index}
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
        <Pass onClick={handlePassClick} />
        <BattleBoard cards={props.G.battle} />
      </ActionSpace>
    </BoardContainer>
  )
}
