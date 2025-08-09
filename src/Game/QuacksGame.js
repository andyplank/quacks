import boardData from './board.json';
import { INVALID_MOVE } from 'boardgame.io/core';

export const TOKEN_TYPES = [
    { id: 'Boomberry 1', color: '#92bad1', value: 1, cost: -1, forSale: false, effect: null },
    { id: 'Boomberry 2', color: '#92bad1', value: 2, cost: -1, forSale: false, effect: null },
    { id: 'Boomberry 3', color: '#92bad1', value: 3, cost: -1, forSale: false, effect: null },
    { id: 'Spider 1', color: '#009b52', value: 1, cost: 4, forSale: true, effect: null },
    { id: 'Pumpkin 1', color: '#f98b36', value: 1, cost: 3, forSale: true, effect: null },
    { id: 'Ghost 1', color: '#bf37a8', value: 1, cost: 9, forSale: true, effect: null },
];

// Helper to get token stats by ID
export function getTokenStats(tokenId) {
    return TOKEN_TYPES.find(t => t.id === tokenId);
}

// Helper to get the current reward for a player
export function getCurrentReward(player) {
    const space = player.board[player.next];
    if (!space) return null;
    return {
        gem: space.gem,
        points: space.points,
        victoryPoints: space["victory-points"]
    };
}

function createBoard() {
    return boardData.map((space, i) => ({ ...space, token: "", index: i }));
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

export const QuacksGame = {
    setup: ({ctx}) => { 
        const players = {};
        for (let i = 0; i < ctx.numPlayers; i++) {
            players[i] = {
                board: createBoard(),
                start: 0,
				next: 1,
                bag: createBag(),
				bagCopy: createBag(),
                victoryPoints: 0,
				coins: 0,
            };
        }
		console.log(players);
        return {
            players,
        };
    },

	phases: {
		brew: {
			moves: {
				drawToken({ G, playerID }, id) {
					const player = G.players[playerID];
					if (player.bag.length === 0) return INVALID_MOVE;
					const idx = Math.floor(Math.random() * player.bag.length);
					const tokenId = player.bag[idx];
					player.bag.splice(idx, 1);
					player.board[player.next].token = tokenId;
					player.next = player.next + getTokenStats(tokenId).value;
				}
			},
			endIf: ({G, playerID}) => {
				const player = G.players[playerID];
				if (player === undefined) return false;
				return player.bag.length === 0;
			},
			next: 'buy',
    		start: true,
			onEnd: ({ G, ctx }) => { 
				for (let i = 0; i < ctx.numPlayers; i++) {
					const player = G.players[i];
					const rewards = getCurrentReward(player);
					player.coins = rewards.coins;
				}
			}
		},
		
		buy: {
        	moves: { 
				buyToken({ G, playerID }, tokenId) {
					const player = G.players[playerID];
					console.log(G);
					const token = getTokenStats(tokenId);
					if (!token || player.coins < token.cost) return INVALID_MOVE;
					player.coins -= token.cost;
					player.bag.push(tokenId);
				}
			},
      	},
	},

};

export default QuacksGame;