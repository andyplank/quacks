const boardData = require('./board.json');
const { INVALID_MOVE, TurnOrder } = require ('boardgame.io/core');

const TOKEN_TYPES = [
    { id: 'Boomberry 1', color: '#92bad1', image: '/tokens/boomberry.png', value: 1, cost: -1, saleQuantity: -1, saleStartRound: 0, bookImage: '', bookDescription: '' },
    { id: 'Boomberry 2', color: '#92bad1', image: '/tokens/boomberry.png', value: 2, cost: -1, saleQuantity: -1, saleStartRound: 0, bookImage: '', bookDescription: '' },
    { id: 'Boomberry 3', color: '#92bad1', image: '/tokens/boomberry.png', value: 3, cost: -1, saleQuantity: -1, saleStartRound: 0, bookImage: '', bookDescription: '' },
    { id: 'Spider 1', color: '#009b52', image: '/tokens/spider.svg', value: 1, cost: 4, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/spider-book.svg', bookDescription: 'Take a ruby if this token is one of the final two placed in your cauldron.' },
    { id: 'Spider 2', color: '#009b52', image: '/tokens/spider.svg', value: 2, cost: 8, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/spider-book.svg', bookDescription: 'Take a ruby if this token is one of the final two placed in your cauldron.' },
    { id: 'Spider 4', color: '#009b52', image: '/tokens/spider.svg', value: 4, cost: 14, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/spider-book.svg', bookDescription: 'Take a ruby if this token is one of the final two placed in your cauldron.' },
    { id: 'Pumpkin 1', color: '#f98b36', image: '/tokens/pumpkin.svg', value: 1, cost: 3, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/pumpkin-book.svg', bookDescription: 'No upgrades.' },
    { id: 'Pumpkin 6', color: '#f98b36', image: '/tokens/pumpkin.svg', value: 6, cost: 22, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/pumpkin-book.svg', bookDescription: 'No upgrades.' },
    { id: 'Ghost 1', color: '#bf37a8', image: '/tokens/ghost.svg', value: 1, cost: 9, saleQuantity: 10, saleStartRound: 3, bookImage: '/tokens/ghost-book.svg', bookDescription: '1 Ghost: +1 Victory Point\n2 Ghosts: +1 Victory Point, +1 Gem\n3+ Ghosts: +2 Victory Points, move droplet forward 1 space' },
    { id: 'Mushroom 1', color: '#f02222ff', image: '/tokens/mushroom.svg', value: 1, cost: 6, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/mushroom-book.svg', bookDescription: 'If there are Pumpkin tokens in your cauldron, move this token forward this many spaces:' },
    { id: 'Mushroom 2', color: '#f02222ff', image: '/tokens/mushroom.svg', value: 2, cost: 10, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/mushroom-book.svg', bookDescription: 'If there are Pumpkin tokens in your cauldron, move this token forward this many spaces:' },
    { id: 'Mushroom 4', color: '#f02222ff', image: '/tokens/mushroom.svg', value: 4, cost: 16, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/mushroom-book.svg', bookDescription: 'If there are Pumpkin tokens in your cauldron, move this token forward this many spaces:' },
    { id: 'Mandrake Root 1', color: '#f9d236ff', image: '/tokens/mandrake.svg', value: 1, cost: 8, saleQuantity: 10, saleStartRound: 1, bookImage: '/tokens/mandrake-book.svg', bookDescription: 'When you draw a Mandrake Root, you may remove the last Boomberry you placed and put it back in your bag.' },
    { id: 'Mandrake Root 2', color: '#f9d236ff', image: '/tokens/mandrake.svg', value: 2, cost: 12, saleQuantity: 10, saleStartRound: 1, bookImage: '/tokens/mandrake-book.svg', bookDescription: 'When you draw a Mandrake Root, you may remove the last Boomberry you placed and put it back in your bag.' },
    { id: 'Mandrake Root 4', color: '#f9d236ff', image: '/tokens/mandrake.svg', value: 4, cost: 18, saleQuantity: 10, saleStartRound: 1, bookImage: '/tokens/mandrake-book.svg', bookDescription: 'When you draw a Mandrake Root, you may remove the last Boomberry you placed and put it back in your bag.' },
    { id: 'Crow 1', color: '#2610e5ff', image: '/tokens/crow.svg', value: 1, cost: 5, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/crow-book.svg', bookDescription: 'When you draw a Crow, immediately draw additional chips equal to its value. You can place one in your cauldron. Put the rest back in your bag.' },
    { id: 'Crow 2', color: '#2610e5ff', image: '/tokens/crow.svg', value: 2, cost: 10, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/crow-book.svg', bookDescription: 'When you draw a Crow, immediately draw additional chips equal to its value. You can place one in your cauldron. Put the rest back in your bag.' },
    { id: 'Crow 4', color: '#2610e5ff', image: '/tokens/crow.svg', value: 4, cost: 19, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/crow-book.svg', bookDescription: 'When you draw a Crow, immediately draw additional chips equal to its value. You can place one in your cauldron. Put the rest back in your bag.' },
    { id: 'Moth 1', color: '#2610e5ff', image: '/tokens/moth.svg', value: 1, cost: 10, saleQuantity: 10, saleStartRound: 0, bookImage: '/tokens/moth-book.svg', bookDescription: 'Moths attract other moths. When you draw one, you may immediately buy another moth if you have enough coins.' },
];

// Helper to get token stats by ID
function getTokenStats(tokenId) {
    return TOKEN_TYPES.find(t => t.id === tokenId);
}

// Helper to get the current reward for a player
function checkReward(player) {
	let space = player.board[player.next];
    if (!space) return null;
	return {
        gem: space.gem ? 1 : 0,
        coins: space.coins,
        points: space.points
    };
}

function checkBoom(player) {
	let boom = 0;
	for (let i = 0; i < player.board.length; i++) {
		if (player.board[i].token === 'Boomberry 1') boom += 1;
		if (player.board[i].token === 'Boomberry 2') boom += 2;
		if (player.board[i].token === 'Boomberry 3') boom += 3;
		if (boom > 7) {
			player.boom = boom;
			return true;
		}
	}
	player.boom = boom;
	return false;
}

function createBoard() {
    return boardData.map((space, i) => ({ ...space, token: "", index: i }));
}

function resetBoard(board) {
	for (const key in board) {
		board[key].token = "";
	}
}

function createBag() {
  return [
    ...Array(4).fill('Boomberry 1'),
    ...Array(2).fill('Boomberry 2'),
    ...Array(1).fill('Boomberry 3'),
    ...Array(1).fill('Spider 1'),
    ...Array(1).fill('Pumpkin 1'),
  ];
}

function checkSpider(player) {
	let spiders = 0;
	let i = player.next;
	if (player.board[i].token === 'Spider 1') spiders += 1;
	i--;
	if (player.board[i].token === 'Spider 1') spiders += 1;
	return spiders;
}

function checkPumpkin(player) {
	let pumpkins = 0;
	for (let i = 0; i < player.board.length; i++) {
		if (player.board[i].token === 'Pumpkin 1' || player.board[i].token === 'Pumpkin 6') pumpkins += 1;
	}
	return pumpkins;
}

function checkGhost(player) {
	let ghosts = 0;
	for (let i = 0; i < player.board.length; i++) {
		if (player.board[i].token === 'Ghost 1') ghosts += 1;
	}
	return ghosts;
}

function placeToken(player, tokenId) {
	const token = getTokenStats(tokenId)
	let index = player.next + token.value-1;
	if (token.id.startsWith('Mandrake')) {
		const tokenPrevId = player.board[player.next - 1].token;
		if (tokenPrevId.startsWith('Boomberry')) {
			player.bag.push(tokenPrevId);
			player.board[player.next - 1].token = "";
		}
	}
	if (token.id.startsWith('Mushroom')) {
		const pumpkins = checkPumpkin(player);
		if (pumpkins >= 1 && pumpkins <= 2) {
			index += 1;
		} else if (pumpkins >= 3) {
			index += 2;
		}
	}
	if (token.id.startsWith('Crow')) {
		const draw = token.value;
		for (let i = 0; i < draw; i++) {
			if (player.bag.length === 0) break;
			const idx = Math.floor(Math.random() * player.bag.length);
			const crowTokenId = player.bag[idx];
			player.bag.splice(idx, 1);
			player.options.push(crowTokenId);
		}
	}
	if (index >= 52) { 
		index = 52;
	}
	player.board[index].token = tokenId;
	player.next = index + 1;
	if (checkBoom(player)) {
		player.boomed = true;
	}
	if (player.next === 53 && !player.boomed) {
		player.passed = true;
	}
}

const QuacksGame = {
	name: "quacks", 
    setup: ({ctx}) => { 
        const players = {};
        for (let i = 0; i < ctx.numPlayers; i++) {
            players[i] = {
                board: createBoard(),
                start: 0,
				next: 1,
                bag: createBag(),
				bagCopy: createBag(),
                points: 0,
				coins: 0,
				gems: 2,
				boom: 0,
				passed: false,
				boomed: false,
				potion: true,
				options: []
            };
        }
		return {
			players,
		};
	},

	moves:{
		pass({ G, playerID }) {
			const player = G.players[playerID];
			if (player.boomed || player.passed) return INVALID_MOVE;
			player.passed = true;
		}
	},

	turn: {
		// The turn order.
		order: TurnOrder.DEFAULT,


		// Ends the turn if this returns true.
		// Returning { next }, sets next playerID.
		endIf: ({ G, ctx, random, ...plugins }) => {
			if (G.players[ctx.currentPlayer].passed || G.players[ctx.currentPlayer].boomed) {
				return true
			}
		},

		// Called after each move.
		// onMove: ({ G, ctx, events, random, ...plugins }) => G,

		// Prevents ending the turn before a minimum number of moves.
		// minMoves: 1,

		// Ends the turn automatically after a number of moves.
		// maxMoves: 1,

		// Calls setActivePlayers with this as argument at the
		// beginning of the turn.
		activePlayers: { all: "all" },
	},

	phases: {
		brew: {
			moves: {
				option({ G, playerID }, tokenId) {
					const player = G.players[playerID];
					if (player.options.length === 0) return INVALID_MOVE;
					if (tokenId === -1 ) {
						player.options.forEach(tokenId => {
							player.bag.push(tokenId);
						});
						player.options = [];
						return;
					}
					const idx = player.options.findIndex(id => id === tokenId);
					if (idx === -1) return INVALID_MOVE;
					player.options.splice(idx, 1);
					player.options.forEach(tokenId => {
						player.bag.push(tokenId);
					});
					player.options = [];
					placeToken(player, tokenId);
				},
				drawToken({ G, ctx, playerID }, id) {
					const player = G.players[playerID];
					if (player.options.length > 0) return INVALID_MOVE;
					if (player.bag.length === 0) return INVALID_MOVE;
					if (player.boomed || player.passed) return INVALID_MOVE;
					const idx = Math.floor(Math.random() * player.bag.length);
					const tokenId = player.bag[idx];
					player.bag.splice(idx, 1);
					player.options = [];
					placeToken(player, tokenId);
				},
				potion({ G, ctx, playerID }, idx) {
					const player = G.players[playerID];
					if (player.potion === false) return INVALID_MOVE;
					const token = player.board[idx].token;
					player.board[idx].token = "";
					player.bag.push(token);
					player.potion = false;
				},
				pass({ G, playerID }) {
					const player = G.players[playerID];
					if (player.boomed || player.passed) return INVALID_MOVE;
					player.passed = true;
				}
			},
			endIf: ({G}) => {
				const playerKeys = Object.keys(G.players);
				for (let i = 0; i < playerKeys.length; i++) {
					const player = G.players[i];				
					if (!player.boomed && !player.passed) {
						return false;
					}
				}
				return true;
			},
			next: 'buy',
    		start: true,
			onStart:  ({ G, ctx }) => { 
				for (let i = 0; i < ctx.numPlayers; i++) {
					const player = G.players[i];
					player.bagCopy = player.bag;
				}
			}, 
			onEnd: ({ G, ctx }) => { 
				for (let i = 0; i < ctx.numPlayers; i++) {
					const player = G.players[i];
					const rewards = checkReward(player);
					player.gems += rewards.gem;
					if (!player.boomed) {
						player.coins = rewards.coins;
						player.points += rewards.points;
					}
					player.gems += checkSpider(player);
					const ghosts = checkGhost(player);
					if (ghosts === 1) {
						player.points += 1;
					} else if (ghosts === 2) {
						player.points += 1;
						player.gems += 1;
					} else if (ghosts >= 3) {
						player.points += 2;
						player.start += 1;
					}
					player.bag = player.bagCopy;
					player.passed = false;
				}
			}
		},
		
		buy: {
        	moves: { 
				buyToken({ G, playerID }, tokenId) {
					const player = G.players[playerID];
					if (player.boomed) return INVALID_MOVE;
					const token = getTokenStats(tokenId);
					if (!token || player.coins < token.cost) return INVALID_MOVE;
					token.saleQuantity -= 1;
					player.coins -= token.cost;
					player.bag.push(tokenId);
				},
				reward({ G, playerID }) {
					const player = G.players[playerID];
					if (!player.boomed) return INVALID_MOVE;
					const rewards = checkReward(player);
					player.points += rewards.points;
					player.boomed = false;
				},
				shop({ G, playerID }) {
					const player = G.players[playerID];
					if (!player.boomed) return INVALID_MOVE;
					const rewards = checkReward(player);
					player.coins = rewards.coins;
					player.boomed = false;
				},
				refill({G, playerID}) {
					const player = G.players[playerID];
					if (player.passed) return INVALID_MOVE;
					if (player.gems < 2 || player.potion) return INVALID_MOVE;
					player.potion = true;
					player.gems -= 2;
				},
				droplet({G, playerID}) {
					const player = G.players[playerID];
					if (player.passed) return INVALID_MOVE;
					if (player.gems < 2) return INVALID_MOVE;
					player.start += 1;
					player.gems -= 2;
				},
				pass({ G, playerID }) {
					const player = G.players[playerID];
					if (player.boomed || player.passed) return INVALID_MOVE;
					player.passed = true;
				}
			},
			next: 'brew',
			endIf: ({G}) => {
				const playerKeys = Object.keys(G.players);
				for (let i = 0; i < playerKeys.length; i++) {
					const player = G.players[i];				
					if (!player.passed) {
						return false;
					}
				}
				return true;
			},
			onEnd: ({ G, ctx }) => { 
				for (let i = 0; i < ctx.numPlayers; i++) {
					const player = G.players[i];
					player.coins = 0;
					player.boom = 0;
					player.bagCopy = player.bag;
					player.next = player.start + 1;
					player.boomed = false;
					player.passed = false;
					resetBoard(player.board);
				}
			}
      	},
	},

};

module.exports = QuacksGame;