const { Server } = require('boardgame.io/server');
const { EmpireOfCards } = require('./Game');

const server = Server({ games: [EmpireOfCards] });

server.run(8000);