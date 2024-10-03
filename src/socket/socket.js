import io from "socket.io-client";
import config from "../config/config.js";

// connecting socket
const socket = io(config.socket);

export default socket;
