// config data from env file
const config = {
  backend: import.meta.env.VITE_BACKEND_URL,
  fileUploadURL: import.meta.env.VITE_FILE_UPLOAD_URL,
  socket: import.meta.env.VITE_SOCKET_URL,
  signup: `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
  login: `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
  logout: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,

  firebaseConfig: {
    apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: String(import.meta.env.VITE_FIREBASE_MSG_SENDER_ID),
    appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
  },
};

export default config;
