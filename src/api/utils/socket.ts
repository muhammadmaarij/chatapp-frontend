// src/utils/socket.ts
import { io, Socket } from "socket.io-client";
import { baseUrl } from "../constants/baseUrl";
import Cookies from 'js-cookie';

const socket: Socket = io(baseUrl, {
  auth: (cb) => {
    const token = Cookies.get('token'); 
    cb({ token });
  },
  reconnection: true, // ✅ Auto-reconnect
  transports: ["websocket"],
});

export default socket;
