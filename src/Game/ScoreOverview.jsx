import React from 'react';

const ScoreOverview = ({ player }) => {
  const containerStyle = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    minWidth: '200px',
  };

  const statRowStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  const gemStyle = {
    ...iconStyle,
    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '8px',
  };

  return (
    <div style={containerStyle}>
      <div style={statRowStyle}>
        <span style={labelStyle}>Victory Points:</span>
        <span>{player.points} 🏆</span>
      </div>
      <div style={statRowStyle}>
        <span style={labelStyle}>Coins:</span>
        <span>{player.coins} 🪙</span>
      </div>
      <div style={statRowStyle}>
        <span style={labelStyle}>Gems:</span>
        <img src="/tokens/gem.svg" alt="Gem" style={gemStyle} />
        <span>{player.gems}</span>
      </div>
      <div style={statRowStyle}>
        <span style={labelStyle}>Boom Value:</span>
        <span>{player.boom} 💥</span>
      </div>
      <div style={statRowStyle}>
        <span style={labelStyle}>Bag Size:</span>
        <span>{player.bag.length} 🎒</span>
      </div>
    </div>
  );
};

export default ScoreOverview;
