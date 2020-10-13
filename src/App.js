import React, { useState } from 'react'
import './App.css'
import { Client, Lobby } from 'boardgame.io/react'
import { Debug } from 'boardgame.io/debug'
// import { SocketIO } from 'boardgame.io/multiplayer'
import { Local } from 'boardgame.io/multiplayer'

import { Board } from './Board'
import { SimpleDeck, NormalDeck } from './GameTypes'

const LocalGame = ({ gameComplexity, numberOfPlayers }) => {
  const SimpleDeckClient = Client({
    game: SimpleDeck,
    board: Board,
    debug: { impl: Debug },
    numPlayers: numberOfPlayers
  })
  const NormalDeckClient = Client({
    game: NormalDeck,
    board: Board,
    numPlayers: numberOfPlayers
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
  const [numberOfPlayers, setNumberOfPlayers] = useState(null)

  const { protocol, hostname, port } = window.location
  const server = `${protocol}//${hostname}:${port}`

  const setNumPlayers = e => {
    setNumberOfPlayers(parseInt(e.target.value))
  }

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
          <p>Select Game Complexity</p>
          <button onClick={() => setGameComplexity('simple')}>simple</button>
          <button onClick={() => setGameComplexity('normal')}>normal</button>
        </div>
      )}
      {gameType === 'local' && gameComplexity && !numberOfPlayers && (
        <div>
          <p>How many players?</p>
          <select onChange={setNumPlayers}>
            <option selected disabled></option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>
      )}
      {gameType === 'local' && gameComplexity && numberOfPlayers && (
        <LocalGame
          gameComplexity={gameComplexity}
          numberOfPlayers={numberOfPlayers}
        />
      )}
      {gameType === 'online' && (
        <Lobby
          gameServer={server}
          lobbyServer={server}
          gameComponents={[
            { game: SimpleDeck, board: Board },
            { game: NormalDeck, board: Board }
          ]}
          debug={true}
        />
      )}
    </>
  )
}
export default App
