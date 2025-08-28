const { Server, Origins } = require('boardgame.io/server');
const QuacksGame = require('./Game.js');
console.log(QuacksGame)

const server = Server({
	games: [QuacksGame],
	origins: [Origins.LOCALHOST],
});

server.run(8000);