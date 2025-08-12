import React from 'react';
import { Client } from 'boardgame.io/react';
import { QuacksGame, getTokenStats, checkReward, checkBoom, TOKEN_TYPES } from './QuacksGame';
import BoardSpace from './BoardSpace';

function QuacksBoard({ ctx, G, moves }) {
	const player = G.players[ctx.currentPlayer];
	const startIndex = player.start;
	return (
		<div>
			{player.boomed && (
				<h1 style={{ color: 'red', fontSize: '3em', textAlign: 'center' }}>BOOM!</h1>
			)}
			<h2>Player {ctx.currentPlayer}'s Turn</h2>
			<div>Rewards {JSON.stringify(checkReward(player))}</div>
			<div>Current Boom {player.boom}</div>
			<div>
				<button className="btn-action" onClick={() => moves.drawToken()}>Draw Token</button>
				<button className="btn-action" onClick={() => moves.pass()}>pass</button>
				{player.options && player.options.length > 0 && typeof moves.option === 'function' && (
					<div style={{ margin: '16px 0' }}>
						<h3>Options</h3>
						{player.options.map((opt, idx) => (
							<button
								key={opt}
								onClick={() => moves.option(opt)}
								style={{ marginRight: 8 }}
							>
								{opt}
							</button>
						))}
						<button onClick={() => moves.option(-1)} style={{ marginLeft: 8 }}>
							Cancel
						</button>
					</div>
				)}
				<div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<h3>Board (Rewards)</h3>
					<div style={{ display: 'flex', flexWrap: 'wrap', width: 600, justifyContent: 'center', margin: '0 auto' }}>
						{player.board.map((space, i) => {
							const isStart = i === startIndex;
							const token = getTokenStats(space.token);
							return (
								<BoardSpace
									key={i}
									space={space}
									isStart={isStart}
									token={token}
									onClick={() => moves.potion(i)}
								/>
							);
						})}
					</div>
				</div>
			</div>
			<div>
				<h3>Buy Tokens</h3>
				<button className="btn-action" onClick={() => moves.shop()}>shop</button>
				<button className="btn-action" onClick={() => moves.reward()}>reward</button>
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
					<button
						onClick={() => moves.refill()}
						style={{
							background: '#8bc34a',
							color: '#fff',
							border: '1px solid #888',
							borderRadius: 4,
							padding: '8px 12px',
							minWidth: 60,
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
						title="Refill"
					>
						Refill
					</button>
					<button
						onClick={() => moves.droplet()}
						style={{
							background: '#03a9f4',
							color: '#fff',
							border: '1px solid #888',
							borderRadius: 4,
							padding: '8px 12px',
							minWidth: 60,
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
						title="Droplet"
					>
						Droplet
					</button>
				</div>
			</div>
		</div>
	);
}

const QuacksClient = Client({
	game: QuacksGame,
	board: QuacksBoard,
	numPlayers: 1,
});

export default QuacksClient;
