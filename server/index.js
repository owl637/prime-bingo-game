const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// 素数生成関数
const generatePrimes = (max) => {
  const primes = [];
  for (let i = 2; i <= max; i++) {
    if (primes.every((prime) => i % prime !== 0)) {
      primes.push(i);
    }
  }
  return primes;
};

// ゲームの状態
const primes = generatePrimes(100);
let currentPrimeIndex = 0;

io.on("connection", (socket) => {
  console.log(`ユーザー接続: ${socket.id}`);

  // クライアントがゲームに参加
  socket.on("joinGame", () => {
    console.log(`ユーザー ${socket.id} がゲームに参加しました`);
    const randomPrime = primes[Math.floor(Math.random() * primes.length)]; // ランダムな素数を選択
    console.log(`送信中のランダム素数: ${randomPrime}`);
    socket.emit("gameUpdate", { prime: randomPrime });
  });

  // 次の素数をリクエストされたとき
  socket.on("nextPrime", () => {
    const randomPrime = primes[Math.floor(Math.random() * primes.length)]; // ランダムな素数を選択
    console.log(`次のランダム素数を送信: ${randomPrime}`);
    io.emit("gameUpdate", { prime: randomPrime }); // 全クライアントに送信
  });

  socket.on("disconnect", () => {
    console.log(`ユーザー切断: ${socket.id}`);
  });
});


const PORT = 4000;
server.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
