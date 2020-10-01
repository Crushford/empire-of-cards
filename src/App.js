import { Client } from 'boardgame.io/react'
import { Board } from './Board'
import { EmpireOfCards } from './Game'

const App = Client({ game: EmpireOfCards, board: Board })

export default App
