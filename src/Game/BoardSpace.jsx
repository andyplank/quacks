import React from 'react';

function BoardSpace({ space, isStart, token, onClick, style }) {
    return (
        <button
            onClick={onClick}
            style={{
                border: '1px solid #ccc',
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                background: space.gem ? '#fff8f84f' : '#ffffff46',
                position: 'relative',
                cursor: 'pointer',
                padding: 0,
                borderRadius: '100%',
                ...style,
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
