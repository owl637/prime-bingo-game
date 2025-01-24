import React from 'react';

const Popup = ({ time, penalty, onRestart }) => {
  const totalScore = time + penalty; // 合計スコア

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h1>クリアおめでとう！</h1>
        <p>タイム: {time} 秒</p>
        <p>ペナルティ: {penalty} 秒</p>
        <h2>合計スコア: {totalScore} 秒</h2>
        <button style={styles.button} onClick={onRestart}>
          もう一度遊ぶ
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default Popup;
