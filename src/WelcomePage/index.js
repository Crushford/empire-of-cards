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
import { WelcomeContainer, GameOption, GameOptions, Title } from './style'
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
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const { protocol, hostname, port } = window.location
  const server = `${protocol}//${hostname}:${port}`

  const setNumPlayers = e => {
    setNumberOfPlayers(parseInt(e.target.value))
  }

  return (
    <WelcomeContainer>
      {!(gameType || isPractice) && (
        <>
          <Title>Empire Of Cards</Title>
          <GameOptions>
            <GameOption onClick={() => setIsPractice(true)}>
              Single Player
            </GameOption>
            <GameOption onClick={() => setGameType('local')}>
              Pass and Play Multiplayer
            </GameOption>
            <GameOption onClick={() => setGameType('online')}>
              Online Multiplayer
            </GameOption>
            <GameOption onClick={() => setShowHowToPlay(!showHowToPlay)}>
              How To Play
            </GameOption>
          </GameOptions>
          {showHowToPlay && <HowToPlay />}
        </>
      )}
      {isPractice && !gameComplexity && (
        <>
          <div>
            <p>Select Game Complexity</p>
            <GameOption onClick={() => setGameComplexity('simple')}>
              simple
            </GameOption>
            <GameOption onClick={() => setGameComplexity('normal')}>
              normal
            </GameOption>
          </div>
        </>
      )}
      {gameType === 'local' && !gameComplexity && (
        <div>
          <p>Select Game Complexity</p>
          <GameOption onClick={() => setGameComplexity('simple')}>
            simple
          </GameOption>
          <GameOption onClick={() => setGameComplexity('normal')}>
            normal
          </GameOption>
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
          gameComponents={[{ game: NormalDeck, board: Board }]}
          debug={true}
        />
      )}
    </WelcomeContainer>
  )
}
