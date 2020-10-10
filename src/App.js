import React, { useState } from 'react'
import './App.css'
import { Client, Lobby } from 'boardgame.io/react'
import { Debug } from 'boardgame.io/debug'
// import { SocketIO } from 'boardgame.io/multiplayer'

import { Board } from './Board'
import { SimpleDeck, NormalDeck } from './GameTypes'

const LocalGame = ({ gameComplexity }) => {
  const SimpleDeckClient = Client({
    game: SimpleDeck,
    board: Board,
    debug: { impl: Debug }
  })
  const NormalDeckClient = Client({
    game: NormalDeck,
    board: Board
  })

  switch (gameComplexity) {
    case 'simple':
      return <SimpleDeckClient />
    default:
      return <NormalDeckClient />
  }
}

const App = () => {
  const [gameType, setGameType] = useState(null)
  const [gameComplexity, setGameComplexity] = useState(null)

  const { protocol, hostname, port } = window.location
  const server = `${protocol}//${hostname}:${port}`

  return (
    <>
      {!gameType && (
        <div>
          <p>Local or Online Multiplayer?</p>
          <button onClick={() => setGameType('local')}>local</button>
          <button onClick={() => setGameType('online')}>online</button>
        </div>
      )}
      {gameType === 'local' && !gameComplexity && (
        <div>
          <p>Select Game Complexity?</p>
          <button onClick={() => setGameComplexity('simple')}>simple</button>
          <button onClick={() => setGameComplexity('normal')}>normal</button>
        </div>
      )}
      {gameType === 'local' && gameComplexity && (
        <LocalGame gameComplexity={gameComplexity} />
      )}
      {gameType === 'online' && (
        <Lobby
          gameServer={server}
          lobbyServer={server}
          gameComponents={[
            { game: SimpleDeck, board: Board },
            { game: NormalDeck, board: Board }
          ]}
        />
      )}
    </>
  )
}
export default App
