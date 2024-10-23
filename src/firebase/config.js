import config from "../config/config.js";
import { initializeApp } from "firebase/app";

// Firebase configuration
const app = initializeApp(config.firebaseConfig);

export { app };
