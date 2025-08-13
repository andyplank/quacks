import React from 'react';
import { TOKEN_TYPES } from './QuacksGame';

function SideBar({ isOpen, isShopOpen, isSpellBookOpen, onBuyToken, coins, toggleShop, toggleSpellBook, roundNumber, onRefill, onDroplet, gems, hasPotion }) {
    return (
        <div style={{ position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 1000, display: 'flex' }}>
            <div style={{
                width: isOpen ? isSpellBookOpen ? '500px': '300px' : '0',
                backgroundColor: '#fff',
                backgroundImage: isSpellBookOpen ? 'url(/page-background.png)' : 'none',
                boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
                padding: isOpen ? '20px' : '0',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
            }}>
                {isShopOpen && (
                    <>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <h2 style={{ margin: 0 }}>Shop</h2>
                        </div>
                        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong>Available:</strong>
                            <span>{coins}</span>
                            <img src="/tokens/coin.svg" alt="coins" style={{ width: '20px', height: '20px' }} />
                            <span>{gems}</span>
                            <img src="/tokens/gem.svg" alt="gems" style={{ width: '20px', height: '20px' }} />
                        </div>
                        <div style={{ marginBottom: '10px', marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center'}}>
                            <button
                                onClick={onRefill}
                                style={{
                                    background: '#8bc34a',
                                    color: '#fff',
                                    border: '1px solid #888',
                                    borderRadius: 4,
                                    padding: '8px 12px',
                                    display: 'flex',
                                    width: '100%',
                                    fontWeight: 'bold',                                        
                                    justifyContent: 'space-between',
                                    cursor: gems < 2 || hasPotion ? 'not-allowed' : 'pointer',
                                    opacity: gems < 2 || hasPotion ? 0.5 : 1,
                                }}
                                title="Refill (2 gems)"
                                disabled={gems < 2 || hasPotion}
                            >                          
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span>Refill</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span>2</span>
                                    <img src="/tokens/gem.svg" alt="gem" style={{ width: '20px', height: '20px' }} />
                                </div>
                            </button>
                            <button
                                onClick={onDroplet}
                                style={{
                                    background: '#03a9f4',
                                    color: '#fff',
                                    border: '1px solid #888',
                                    borderRadius: 4,
                                    padding: '8px 12px',
                                    display: 'flex',
                                    fontWeight: 'bold', 
                                    width: '100%',                                       
                                    justifyContent: 'space-between',
                                    cursor: gems < 2 ? 'not-allowed' : 'pointer',
                                    opacity: gems < 2 ? 0.5 : 1,
                                }}
                                title="Droplet (2 gems)"
                                disabled={gems < 2}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span>Droplet</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span>2</span>
                                    <img src="/tokens/gem.svg" alt="gem" style={{ width: '20px', height: '20px' }} />
                                </div>
                            </button>
                        </div>
                        <h4 style={{textAlign: 'left'}}>Tokens</h4>
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
                 {isSpellBookOpen && (
                    <>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}>
                            <h2 style={{ margin: 0 }}>Spell Books</h2>
                        </div>
                        <div style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'scroll',
                            gap: '10px'
                        }}>
                            {/* Group tokens by their type and only show unique spell books */}
                            {Array.from(new Set(TOKEN_TYPES.map(token => token.id.split(' ')[0]))).map(tokenType => {
                                const token = TOKEN_TYPES.find(t => t.id.startsWith(tokenType));
                                if (!token || !token.bookImage || token.saleStartRound > roundNumber) return null;
                                
                                return (
                                    <div key={tokenType} style={{
                                        padding: '20px',
                                        background: '#f5f5f5',
                                        borderRadius: '12px',
                                        marginBottom: '15px',
                                        position: 'relative',
                                    }}>
                                        <div style={{
                                            alignItems: 'flex-start',
                                            gap: '20px'
                                        }}>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ 
                                                    marginTop: 0,
                                                    color: token.color,
                                                    fontSize: '1.2em'
                                                }}>{tokenType}</h3>
                                                <p style={{
                                                    margin: '10px 0',
                                                    lineHeight: '1.4',
                                                    whiteSpace: 'pre-line'
                                                }}>{token.bookDescription}</p>
                                            </div>
                                            <img 
                                                src={token.bookImage} 
                                                alt={`${tokenType} Book`} 
                                                style={{
                                                    margin: '-100px',
                                                    height: '500px',
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <button
                    onClick={toggleShop}
                    style={{
                        background: '#ff9800',
                        color: '#fff',
                        border: '0px solid transparent',
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
                <button
                    onClick={toggleSpellBook}
                    style={{
                        background: '#8d02ffff',
                        color: '#fff',
                        border: '0px solid transparent',
                        borderRadius: '0 4px 4px 0',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        height: '95px',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    title="Toggle Spell Books"
                >
                    <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                        Spell Books
                    </span>
                </button>
            </div>
        </div>
    );
}

export default SideBar;
