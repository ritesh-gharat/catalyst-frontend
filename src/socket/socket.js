import io from "socket.io-client";
import config from "../config/config.js";

console.log(config.socket);

// connecting socket
const socket = io(config.socket);

export default socket;
