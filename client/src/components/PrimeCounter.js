import React, { useState, useEffect } from 'react';
import socket from '../socket'; // サーバー接続

const PrimeCounter = () => {
  const [currentPrime, setCurrentPrime] = useState(null); // 現在の素数
  const [countdown, setCountdown] = useState(0); // カウントダウン

  useEffect(() => {
    // サーバーに参加リクエストを送信
    socket.emit("joinGame");

    // サーバーから素数情報を受信
    socket.on("gameUpdate", (data) => {
      console.log("サーバーから受信:", data); // デバッグ用ログ
      setCurrentPrime(data.prime); // 素数を更新
      setCountdown(data.prime); // カウントダウンを初期化
    });

    return () => {
      socket.off("gameUpdate"); // クリーンアップ
    };
  }, []);

  useEffect(() => {
    // カウントダウンタイマー
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && currentPrime !== null) {
      console.log("カウントダウンが0になりました。次の素数をリクエストします。");
      socket.emit("nextPrime"); // 次の素数をリクエスト
    }
  }, [countdown, currentPrime]);

  // スキップボタンの処理
  const handleSkip = () => {
    console.log("スキップボタンが押されました。次の素数をリクエストします。");
    socket.emit("nextPrime"); // 次の素数をリクエスト
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center' , marginRight: '20px'}}>
        <h2>現在の素数: {currentPrime || "待機中..."}</h2>
        <h3>次の素数まで: {countdown} 秒</h3>
      </div>
      <button style={styles.button} onClick={handleSkip}>
        スキップ
      </button>
    </div>
  );
};

const styles = {
  container: {
    // textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    fontSize: '20px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default PrimeCounter;
