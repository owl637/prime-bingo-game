import React, { useState } from 'react';

const BingoBoard = ({ currentPrime, onGameClear }) => {
  const generateBoard = () => {
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    const board = Array.from({ length: 5 }, (_, rowIndex) =>
      numbers.slice(rowIndex * 5, rowIndex * 5 + 5)
    );
    board[2][2] = 1; // 真ん中は固定で99
    return board;
  };

  const [board, setBoard] = useState(generateBoard());

  const checkBingo = (board) => {
    const isRowComplete = board.some((row) => row.every((cell) => cell === 1));
    const isColComplete = board[0].some((_, colIndex) =>
      board.every((row) => row[colIndex] === 1)
    );
    const isDiagonalComplete =
      board.every((row, index) => row[index] === 1) ||
      board.every((row, index) => row[4 - index] === 1);

    return isRowComplete || isColComplete || isDiagonalComplete;
  };

  const calculatePenalty = (board) => {
    return board
    .flat()
    .filter((cell) => cell !== 1) // 空いていないマス
    .reduce((sum, value) => sum + value, 0);
  };


  const handleClick = (row, col) => {
    if (!currentPrime) return;

    const cellValue = board[row][col];
    if (cellValue % currentPrime === 0) {
      const newValue = cellValue / currentPrime;
      const newBoard = [...board];
      newBoard[row][col] = newValue;
      setBoard(newBoard);

      if (newValue === 1 && checkBingo(newBoard)) {
        const penalty = calculatePenalty(newBoard);
        onGameClear(penalty); // ペナルティを渡す
      }
    }
  };

  return (
    <div style={styles.boardContainer}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {row.map((num, colIndex) => (
            <div
              key={colIndex}
              style={
                num === 1
                  ? { ...styles.cell, ...styles.hole }
                  : styles.cell
              }
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {num !== 1 ? num : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  row: {
    display: 'flex',
  },
  cell: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    margin: '2px',
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
  },
  hole: {
    backgroundColor: '#000', // 黒く塗る
    color: '#000', // 数字を見えなくする
    cursor: 'default', // クリック不可にする
  },
};

export default BingoBoard;
