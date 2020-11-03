import React, { useState } from 'react'
import { Client, Lobby } from 'boardgame.io/react'
// import { Debug } from 'boardgame.io/debug'

import { Board } from '../Board'
import {
  SimpleDeck,
  NormalDeck,
  PracticeSimpleDeck,
  PracticeNormalDeck
} from '../Game/GameTypes'
import { WelcomeContainer } from './style'
import { HowToPlay } from './HowToPlay'

const LocalGame = ({ gameComplexity, numberOfPlayers, isPractice }) => {
  const standardOptions = {
    board: Board,
    numPlayers: numberOfPlayers
    // debug: { impl: Debug }
  }
  const SimpleDeckClient = Client({
    game: SimpleDeck,
    ...standardOptions
  })
  const NormalDeckClient = Client({
    game: NormalDeck,
    ...standardOptions
  })

  const PracticeSimpleDeckClient = Client({
    game: PracticeSimpleDeck,
    ...standardOptions
  })
  const PracticeNormalDeckClient = Client({
    game: PracticeNormalDeck,
    ...standardOptions
  })

  if (isPractice) {
    switch (gameComplexity) {
      case 'simple':
        return <PracticeSimpleDeckClient />
      default:
        return <PracticeNormalDeckClient />
    }
  } else {
    switch (gameComplexity) {
      case 'simple':
        return <SimpleDeckClient />
      default:
        return <NormalDeckClient />
    }
  }
}

export const WelcomePage = () => {
  const [gameType, setGameType] = useState(null)
  // simple game disabled by setting normal game as default
  const [gameComplexity, setGameComplexity] = useState('normal')
  const [numberOfPlayers, setNumberOfPlayers] = useState(null)
  const [isPractice, setIsPractice] = useState(null)

  const { protocol, hostname, port } = window.location
  const server = `${protocol}//${hostname}:${port}`

  const setNumPlayers = e => {
    setNumberOfPlayers(parseInt(e.target.value))
  }

  return (
    <WelcomeContainer>
      {!(gameType || isPractice) && (
        <>
          <HowToPlay />
          <h1>Ready to Play?</h1>
          <button onClick={() => setIsPractice(true)}>Single Player</button>
          <div>
            <p>Multiplayer</p>
            <button onClick={() => setGameType('local')}>local</button>
            <button onClick={() => setGameType('online')}>online</button>
          </div>
        </>
      )}
      {isPractice && !gameComplexity && (
        <>
          <div>
            <p>Select Game Complexity</p>
            <button onClick={() => setGameComplexity('simple')}>simple</button>
            <button onClick={() => setGameComplexity('normal')}>normal</button>
          </div>
        </>
      )}
      {gameType === 'local' && !gameComplexity && (
        <div>
          <p>Select Game Complexity</p>
          <button onClick={() => setGameComplexity('simple')}>simple</button>
          <button onClick={() => setGameComplexity('normal')}>normal</button>
        </div>
      )}
      {(gameType === 'local' || isPractice) &&
        gameComplexity &&
        !numberOfPlayers && (
          <div>
            <p>How many {isPractice ? 'opponents' : 'players'}?</p>
            <select onChange={setNumPlayers}>
              <option selected disabled></option>
              <option value={2}>{isPractice ? 1 : 2}</option>
              <option value={3}>{isPractice ? 2 : 3}</option>
              <option value={4}>{isPractice ? 3 : 4}</option>
            </select>
          </div>
        )}
      {isPractice && gameComplexity && numberOfPlayers && (
        <LocalGame
          gameComplexity={gameComplexity}
          numberOfPlayers={numberOfPlayers}
          isPractice={true}
        />
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
    </WelcomeContainer>
  )
}
