import React from 'react';

const RulePopup = ({ onClose }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>ゲームのルール</h2>
        <p>
          1. 5×5のマスには1～100の数字がランダムに配置されます。<br />
          2. 現在の素数が表示され、その素数で割り切れる数字をクリックできます。<br />
          3. クリックした数字が素数で割り切れる場合、その数字は素数で割った商に置き換わります。<br />
          4. 数字が1になったマスは黒く塗られます（穴が開きます）。<br />
          5. 縦・横・斜めのいずれか1列が揃ったらゲームクリアです！<br />
          6. クリア時には空いていないマスの合計がペナルティとしてタイムに加算されます。
        </p>
        <button style={styles.button} onClick={onClose}>
          閉じる
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
    maxWidth: '400px',
    width: '90%',
  },
  button: {
    marginTop: '0px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default RulePopup;
