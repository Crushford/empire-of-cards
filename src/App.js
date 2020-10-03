import React from 'react'
import { Client } from 'boardgame.io/react'
// import { Local } from 'boardgame.io/multiplayer'
import { SocketIO } from 'boardgame.io/multiplayer'

import { Board } from './Board'
import { EmpireOfCards } from './Game'

// const EmpireOfCardClient = Client({
//   game: EmpireOfCards,
//   board: Board,
//   multiplayer: Local()
// })

const EmpireOfCardClient = Client({
  game: EmpireOfCards,
  board: Board,
  multiplayer: SocketIO({ server: 'localhost:8000' })
})

const App = () => (
  <div>
    <EmpireOfCardClient playerID="0" />
  </div>
)
export default App
