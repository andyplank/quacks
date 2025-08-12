import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { QuacksGame, getTokenStats, checkReward } from './QuacksGame';
import BoardSpace from './BoardSpace';
import ShopModal from './ShopModal';

function QuacksBoard({ ctx, G, moves }) {
	const [isShopOpen, setIsShopOpen] = useState(false);
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
			<div style={{ position: 'relative', marginTop: '20px' }}>
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
					<button
						className="btn-action"
						onClick={() => moves.reward()}
						style={{
							background: '#4caf50',
							color: '#fff',
							border: '1px solid #888',
							borderRadius: 4,
							padding: '8px 12px',
							fontWeight: 'bold',
							cursor: 'pointer',
						}}
					>
						Reward
					</button>
					<button
						onClick={() => moves.refill()}
						style={{
							background: '#8bc34a',
							color: '#fff',
							border: '1px solid #888',
							borderRadius: 4,
							padding: '8px 12px',
							fontWeight: 'bold',
							cursor: player.gems < 2 || player.potion ? 'not-allowed' : 'pointer',
							opacity: player.gems < 2 || player.potion ? 0.5 : 1,
						}}
						title="Refill (2 gems)"
						disabled={player.gems < 2 || player.potion}
					>
						Refill 💎×2
					</button>
					<button
						onClick={() => moves.droplet()}
						style={{
							background: '#03a9f4',
							color: '#fff',
							border: '1px solid #888',
							borderRadius: 4,
							padding: '8px 12px',
							fontWeight: 'bold',
							cursor: player.gems < 2 ? 'not-allowed' : 'pointer',
							opacity: player.gems < 2 ? 0.5 : 1,
						}}
						title="Droplet (2 gems)"
						disabled={player.gems < 2}
					>
						Droplet 💎×2
					</button>
				</div>
				<ShopModal 
					isOpen={isShopOpen}
					onClose={() => setIsShopOpen(false)}
					onToggle={() => setIsShopOpen(!isShopOpen)}
					onBuyToken={(tokenId) => {
						moves.buyToken(tokenId);
						if (!player.coins) setIsShopOpen(false);
					}}
					coins={player.coins}
					roundNumber={ctx.turn}
				/>
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
