// Title.js
import React from 'react';

const Title = () => {
  return (
    <div style={styles.titleContainer}>
      <h1>素数ビンゴゲーム</h1>
    </div>
  );
}

const styles = {
  titleContainer: {
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#4CAF50',
    fontSize: '25px'
  }
};

export default Title;
