import React from 'react';

function BoardSpace({ space, isStart, token, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                width: 60,
                height: 60,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 1,
                fontSize: 10,
                background: space.gem ? '#fff8f8ff' : '#fff',
                position: 'relative',
                cursor: 'pointer',
                padding: 0,
            }}
        >
            {isStart && (
                 <img 
                    src="/tokens/droplet.svg" 
                    alt="droplet" 
                    title="droplet" 
                    style={{ width: 35, height: 35, position: 'absolute'}} 
                />
            )}
            <div style={{ fontWeight: 'bold' }}>{space.coins}</div>
            <div style={{ color: '#888', position: 'absolute', bottom: 2, left: 2}}>VP: {space["points"]}</div>
            {space.gem && (
                <img 
                    src="/tokens/gem.svg" 
                    alt="Gem" 
                    title="Gem" 
                    style={{ width: 16, height: 16, position: 'absolute', bottom: 2, right: 2}} 
                />
            )}
            {token !== undefined && (
                <span
                    title={`Token: ${token.id}`}
                    style={{
                        fontSize: 18,
                        marginTop: 2,
                        background: token.image ? '#fff8f8ff' : token.color,
                        borderRadius: '50%',
                        padding: '2px 6px',
                        border: '1px solid #888',
                        display: 'inline-block',
                    }}
                >
                    {token.value}
                </span>
            )}
        </button>
    );
}

export default BoardSpace;
