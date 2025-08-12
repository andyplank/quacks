import React from 'react';

const BoomModal = ({ onTakePoints, onTakeCoins }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    textAlign: 'center',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
  };

  const pointsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4caf50',
    color: 'white',
  };

  const coinsButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f9d236',
    color: 'black',
  };

  return (
    <div>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        <h2 style={{ color: 'red', marginBottom: '20px' }}>BOOM!</h2>
        <p style={{ marginBottom: '20px' }}>Choose your consequence:</p>
        <button
          style={pointsButtonStyle}
          onClick={onTakePoints}
        >
          Take Victory Points
        </button>
        <button
          style={coinsButtonStyle}
          onClick={onTakeCoins}
        >
          Take Coins
        </button>
      </div>
    </div>
  );
};

export default BoomModal;
