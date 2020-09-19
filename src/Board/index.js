import React from 'react'
import styled from 'styled-components'
import { PlayerSpace } from './PlayerSpace'
import { BattleBoard } from './BattleBoard'
import { Deck } from './Deck'

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
  // const onClick = id => {
  //   props.moves.clickCell(id)
  // }

  // let winner = ''
  // if (props.ctx.gameover) {
  //   winner =
  //     props.ctx.gameover.winner !== undefined ? (
  //       <div id="winner">Winner: {props.ctx.gameover.winner}</div>
  //     ) : (
  //       <div id="winner">Draw!</div>
  //     )
  // }

  const players = props.G.cards.players.map((player, index) => {
    return <PlayerSpace key={index} playerNumber={index} player={player} />
  })

  return (
    <BoardContainer>
      {players}
      <ActionSpace>
        <Deck cards={props.G.cards.deck} />
        <BattleBoard cards={props.G.cards.battle} />
      </ActionSpace>
    </BoardContainer>
  )
}
