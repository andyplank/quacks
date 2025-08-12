import React from 'react';
import { TOKEN_TYPES } from './QuacksGame';

function ShopModal({ isOpen, onClose, onBuyToken, coins, onToggle, roundNumber }) {
    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1000, display: 'flex' }}>
            <div style={{
                width: isOpen ? '300px' : '0',
                backgroundColor: '#fff',
                boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
                padding: isOpen ? '20px' : '0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
            }}>
                {isOpen && (
                    <>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h2 style={{ margin: 0 }}>Shop</h2>
                            <button 
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer'
                                }}
                            >
                                ×
                            </button>
                        </div>
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong>Available:</strong>
                            <span>{coins}</span>
                            <img src="/tokens/coin.svg" alt="coins" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            overflowY: 'auto'
                        }}>
                            {TOKEN_TYPES.filter(token => token.saleQuantity > 0 && token.saleStartRound < roundNumber).map((token) => (
                                <button
                                    key={token.id}
                                    onClick={() => onBuyToken(token.id)}
                                    disabled={coins < token.cost}
                                    style={{
                                        background: token.color,
                                        color: '#fff',
                                        border: '1px solid #888',
                                        borderRadius: 4,
                                        padding: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: coins < token.cost ? 'not-allowed' : 'pointer',
                                        opacity: coins < token.cost ? 0.5 : 1,
                                    }}
                                    title={`Buy ${token.id} for ${token.cost} coins`}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={token.image} alt={token.id} style={{ width: '24px', height: '24px' }} />
                                        <span>{token.id}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span>{token.cost}</span>
                                        <img src="/tokens/coin.svg" alt="coins" style={{ width: '20px', height: '20px' }} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <button
                onClick={onToggle}
                style={{
                    background: '#ff9800',
                    color: '#fff',
                    border: '1px solid #888',
                    borderRadius: '0 4px 4px 0',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    height: '80px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
                title="Toggle Shop"
            >
                <img 
                    src="/tokens/coin.svg" 
                    alt="Shop" 
                    style={{ width: '24px', height: '24px' }} 
                />
                <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                    Shop
                </span>
            </button>
        </div>
    );
}

export default ShopModal;
