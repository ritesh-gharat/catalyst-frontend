import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/Auth.Context";

import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import LogIn from "./pages/login/LogIn";
import User from "./pages/user/User";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/signup"
          element={authUser ? <Navigate to="/app/user" /> : <SignUp />}
        />
        <Route
          path="/auth/login"
          element={authUser ? <Navigate to="/app/user" /> : <LogIn />}
        />
        <Route
          path="/app/user"
          element={authUser ? <User /> : <Navigate to="/auth/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
