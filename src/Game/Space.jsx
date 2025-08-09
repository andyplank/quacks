import React from "react";

const Space = ({ playerBoardSpace }) => {
    const { i, space, token, isStart } = playerBoardSpace;
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
                background: space && space.gem ? '#e0f7fa' : '#fff',
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
            <div style={{ fontWeight: 'bold' }}>{space && space.points}</div>
            <div style={{ color: '#888' }}>VP: {space && space["victory-points"]}</div>
            {space && space.gem && (
                <span title="Gem" style={{ fontSize: 16, color: '#00bcd4' }}>💎</span>
            )}
            {token !== undefined && token !== null && (
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
};

export default Space;