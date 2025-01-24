import React, { useState, useEffect } from 'react';
import socket from './socket';
import Title from './components/Title';
import Timer from './components/Timer';
import BingoBoard from './components/BingoBoard';
import Popup from './components/Popup';
import PrimeCounter from './components/PrimeCounter';
import RulePopup from './components/RulePopup';

function App() {
  const [currentPrime, setCurrentPrime] = useState(null); // 現在の素数
  const [isGameClear, setIsGameClear] = useState(false); // ゲームクリア状態
  const [time, setTime] = useState(0); // タイム
  const [penalty, setPenalty] = useState(0); // ペナルティ
  const [isRulePopupOpen, setIsRulePopupOpen] = useState(false); // ルールポップアップの状態

  useEffect(() => {
    // サーバーから素数を受信
    socket.on("gameUpdate", (data) => {
      console.log("サーバーから受信:", data);
      setCurrentPrime(data.prime);
    });

    return () => {
      socket.off("gameUpdate");
    };
  }, []);

  // タイマーの管理
  useEffect(() => {
    if (!isGameClear) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameClear]);

  const handleGameClear = (penalty) => {
    setPenalty(penalty);
    setIsGameClear(true);
  };

  const handleRestart = () => {
    setTime(0);
    setPenalty(0);
    setIsGameClear(false);
    window.location.reload();
  };

  const toggleRulePopup = () => {
    setIsRulePopupOpen(!isRulePopupOpen);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Title />
      <button style={styles.ruleButton} onClick={toggleRulePopup}>
        ルールを見る
      </button>
      <Timer time={time} />
      <BingoBoard currentPrime={currentPrime} onGameClear={handleGameClear} />
      {isGameClear && (
        <Popup
          time={time} 
          penalty={penalty}
          onRestart={handleRestart}
        />
      )}
      {isRulePopupOpen && <RulePopup onClose={toggleRulePopup} />}
      <PrimeCounter />
    </div>
  );
}

const styles = {
  ruleButton: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default App;
