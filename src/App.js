import React, { useState } from 'react'
import { Client } from 'boardgame.io/react'
import { Local } from 'boardgame.io/multiplayer'
import { SocketIO } from 'boardgame.io/multiplayer'

import { Board } from './Board'
import { EmpireOfCards } from './Game'

const LocalMultiPlayerEmpireOfCardsClient = Client({
  game: EmpireOfCards,
  board: Board
})

const OnlineMultiPLayerEmpireOfCardsClient = Client({
  game: EmpireOfCards,
  board: Board,
  multiplayer: SocketIO({ server: 'localhost:8000' })
})

const App = () => {
  const [playerID, setPlayerID] = useState(null)
  const [gameType, setGameType] = useState(null)

  return (
    <>
      {!gameType && (
        <div>
          <p>Local or Online Multiplayer?</p>
          <button onClick={() => setGameType('local')}>local</button>
          <button onClick={() => setGameType('online')}>online</button>
        </div>
      )}
      {gameType === 'online' && !playerID && (
        <div>
          <p>Play as</p>
          <button onClick={() => setPlayerID('0')}>Player 0</button>
          <button onClick={() => setPlayerID('1')}>Player 1</button>
        </div>
      )}
      {gameType === 'local' && <LocalMultiPlayerEmpireOfCardsClient />}
      {gameType === 'online' && playerID && (
        <OnlineMultiPLayerEmpireOfCardsClient playerID={playerID} />
      )}
    </>
  )
}
export default App
