// config data from env file
const config = {
  backend: import.meta.env.VITE_BACKEND_URL,
  fileUploadURL: import.meta.env.VITE_FILE_UPLOAD_URL,
  socket: import.meta.env.VITE_SOCKET_URL,
  signup: `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
  login: `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
  logout: `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
};

export default config;
