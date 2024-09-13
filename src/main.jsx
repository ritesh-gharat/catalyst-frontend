import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth.Context";
import { AppContextProvider } from "./context/App.Context.jsx";
import RApp from "./RApp.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <RApp />
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
