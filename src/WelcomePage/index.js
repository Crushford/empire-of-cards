import React, { useState } from 'react'
import { Client, Lobby } from 'boardgame.io/react'
import { Debug } from 'boardgame.io/debug'

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
    numPlayers: numberOfPlayers,
    debug: { impl: Debug }
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
  const [numberOfPlayers, setNumberOfPlayers] = useState(null)
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  const { protocol, hostname, port } = window.location
  const server = `${protocol}//${hostname}:${port}`

  const setNumPlayers = e => {
    setNumberOfPlayers(parseInt(e.target.value))
  }

  return (
    <WelcomeContainer>
      {!gameType && (
        <>
          <Title>Empire Of Cards</Title>
          <GameOptions>
            <GameOption onClick={() => setGameType('single')}>
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
      {gameType && gameType !== 'online' && !numberOfPlayers && (
        <div>
          <Title>
            How many {gameType === 'single' ? 'opponents' : 'players'}?
          </Title>
          <select onChange={setNumPlayers}>
            <option selected disabled></option>
            <option value={2}>{gameType === 'single' ? 1 : 2}</option>
            <option value={3}>{gameType === 'single' ? 2 : 3}</option>
            <option value={4}>{gameType === 'single' ? 3 : 4}</option>
          </select>
        </div>
      )}
      {gameType && gameType !== 'online' && numberOfPlayers && (
        <LocalGame
          gameComplexity={'normal'}
          numberOfPlayers={numberOfPlayers}
          isPractice={gameType === 'single'}
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
