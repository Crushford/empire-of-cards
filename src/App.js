import { Client } from 'boardgame.io/react'
import { Board } from './Board'
import { TicTacToe } from './Game'

const App = Client({ game: TicTacToe, board: Board })

export default App
