// socket.js
import { io } from "socket.io-client";

const URL = "https://prime-bingo-game-server.onrender.com"; // サーバーのURL
const socket = io(URL);

export default socket;
