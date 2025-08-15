import React from 'react';

function BoardSpace({ space, isStart, token, onClick, style }) {
    return (
        <button
            onClick={onClick}
            style={{
                border: 'transparent',
                background: 'transparent',
                width: 40,
                height: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
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
                        width: 24,
                        height: 24,
                        marginTop: 2,
                        backgroundImage: token.image ? `url(${token.image})` : undefined,
                        backgroundColor: token.color,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '100%',
                        border: '1px solid #888',
                        display: 'inline-block',
                    }}
                >
                    <div style={{color: '#000000ff', textAlign: 'center', lineHeight: '24px'}}>
                        {token.value}
                    </div>
                </span>
            )}
        </button>
    );
}

export default BoardSpace;
