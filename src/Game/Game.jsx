import React from 'react';
import { Client } from 'boardgame.io/react';
import { QuacksGame, getTokenStats, getCurrentReward, TOKEN_TYPES } from './QuacksGame';

function QuacksBoard({ ctx, G, moves }) {
	const player = G.players[ctx.currentPlayer];
	const startIndex = player.start;
	return (
		<div>
			<h2>Player {ctx.currentPlayer}'s Turn</h2>
			<div>Rewards {JSON.stringify(getCurrentReward(player))}</div>
			<div>
				<button onClick={() => moves.drawToken()}>Draw Token</button>
				<div style={{ marginTop: 20 }}>
					<h3>Board (Rewards)</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', width: 600 }}>
						{player.board.map((space, i) => {
							const isStart = i === startIndex;
							const token = getTokenStats(space.token);
							return (
								<div
									key={i}
									style={{
										border: '1px solid #ccc',
										width: 50,
										height: 50,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										margin: 1,
										fontSize: 10,
										background: space.gem ? '#e0f7fa' : '#fff',
										position: 'relative',
									}}
								>
									{isStart && (
										<span
											title="Start"
											style={{ position: 'absolute', top: 2, left: 2, fontSize: 18 }}
										>
											🚩
										</span>
									)}
									<div style={{ fontWeight: 'bold' }}>{space.points}</div>
									<div style={{ color: '#888' }}>VP: {space["victory-points"]}</div>
									{space.gem && (
										<span title="Gem" style={{ fontSize: 16, color: '#00bcd4' }}>💎</span>
									)}
									{token !== undefined && (
										<span
											title={`Token: ${token.id}`}
											style={{
												fontSize: 18,
												marginTop: 2,
												background: token.color,
												borderRadius: '50%',
												padding: '2px 6px',
												border: '1px solid #888',
												display: 'inline-block',
											}}
										>
											{token.value}
										</span>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div>
				<h3>Buy Tokens</h3>
				<div style={{ display: 'flex', gap: 10 }}>
					{TOKEN_TYPES.filter(token => token.forSale).map((token) => (
						<button
							key={token.id}
							onClick={() => moves.buyToken(token.id)}
							style={{
								background: token.color,
								color: '#fff',
								border: '1px solid #888',
								borderRadius: 4,
								padding: '8px 12px',
								minWidth: 60,
								fontWeight: 'bold',
								cursor: 'pointer',
							}}
							title={`Buy ${token.id} for ${token.cost} coins`}
						>
							{token.id} ({token.cost})
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

const QuacksClient = Client({
	game: QuacksGame,
	board: QuacksBoard,
	numPlayers: 2,
});

export default QuacksClient;
