import React from 'react';

const Timer = ({ time }) => {
  return (
    <div style={styles.container}>
      <h3>タイム: {time} 秒</h3>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
  },
};

export default Timer;
