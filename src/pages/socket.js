// socket.js
import { io } from "socket.io-client";

export const socket = io("https://school-van-track.onrender.com", {
  transports: ["websocket"],
  autoConnect: false, // connect manually
});
