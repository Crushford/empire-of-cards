import { Server } from 'boardgame.io/server'
import { SimpleDeck, NormalDeck } from './src/GameTypes'
import path from 'path'
import serve from 'koa-static'

const server = Server({ games: [SimpleDeck, NormalDeck] })
const PORT = process.env.PORT || 8000
const API_PORT = process.env.PORT || 8080

// Build path relative to the server.js file
const frontEndAppBuildPath = path.resolve(__dirname, './build')
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) =>
      await serve(frontEndAppBuildPath)(
        Object.assign(ctx, { path: 'index.html' }),
        next
      )
  )
})

const lobbyConfig = {
  apiPort: API_PORT,
  apiCallback: () => console.log('Running Lobby API on port 8080...')
}

server.run({ port: PORT, lobbyConfig })
