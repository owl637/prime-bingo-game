// socket.js
import { io } from "socket.io-client";

const URL = "http://localhost:4000"; // サーバーのURL
const socket = io(URL);

export default socket;
