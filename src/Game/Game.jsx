import React, { useState } from 'react';
import { Client } from 'boardgame.io/react';
import { QuacksGame, getTokenStats } from './QuacksGame';
import BoardSpace from './BoardSpace';
import SideBar from './SideBar';
import BoomModal from './BoomModal';
import ScoreOverview from './ScoreOverview';

function QuacksBoard({ ctx, G, moves }) {
	const [isShopOpen, setIsShopOpen] = useState(false);
	const [isSpellBookOpen, setIsSpellBookOpen] = useState(false);
	const player = G.players[ctx.currentPlayer];
	const startIndex = player.start;
	return (
		<div style={{ position: 'relative' }}>
			<ScoreOverview player={player} />
			{player.boomed && (
				<>
					<BoomModal
						onTakePoints={() => {
							moves.reward();
						}}
						onTakeCoins={() => {
							moves.shop();
						}}
					/>
				</>
			)}
			<h2>Player {ctx.currentPlayer}'s Turn</h2>
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
					<h3>Board</h3>
					<div style={{ 
							position: 'relative',
							width: 600,
							height: 600,
						}}>
						<img src='/tokens/cauldron.svg'
						 style= {{ position: 'relative', height: '600px', zIndex: -1}}/>
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
									style={{
										position: 'absolute',
										left: space.x,
										top: space.y,
										transition: 'all 0.3s ease-in-out',
									}}
								/>
							);
						})}
					</div>
					   <div>
						<img 
						  style={{zIndex: -1, height: '150px', position: 'relative', left: '220px', bottom: '210px' }}
						  src={player.potion ? '/tokens/full-potion.svg' : '/tokens/empty-potion.svg'} 
						  alt={player.potion ? "Full Potion" : "Empty Potion"} 
						/>
					</div>
				</div>
			</div>
			<div style={{ position: 'relative', marginTop: '20px' }}>
				<SideBar 
					isOpen={isShopOpen || isSpellBookOpen}
					isShopOpen={isShopOpen}
					isSpellBookOpen={isSpellBookOpen}
					toggleSpellBook={() => {
						setIsShopOpen(false);
						setIsSpellBookOpen(!isSpellBookOpen);
					}}
					toggleShop={() => {
						setIsShopOpen(!isShopOpen);
						setIsSpellBookOpen(false);
					}}
					onBuyToken={(tokenId) => {
						moves.buyToken(tokenId);
						if (!player.coins) setIsShopOpen(false);
					}}
					coins={player.coins}
					roundNumber={ctx.turn}
					onRefill={() => moves.refill()}
					onDroplet={() => moves.droplet()}
					gems={player.gems}
					hasPotion={player.potion}
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
