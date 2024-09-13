import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/Auth.Context";

import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import LogIn from "./pages/login/LogIn";
import App from "./pages/app/App";

import LearningSession from "./components/LearningSession/LearningSession";
//import ExpertSection from "./components/ExpertSection/ExpertSection"

import User from "./pages/user/User";

function RApp() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/signup"
          element={authUser ? <Navigate to="/app/learning" /> : <SignUp />}
        />
        <Route
          path="/auth/login"
          element={authUser ? <Navigate to="/app/learning" /> : <LogIn />}
        />
        <Route
          path="/app/user"
          element={authUser ? <User /> : <Navigate to="/auth/login" />}
        />
        {/* <Route
          path="/app/learning"
          element={authUser ? <App /> : <Navigate to="/auth/login" />}
        /> */}

        <Route element={<App />}>
          <Route path="/app/learning" element={<LearningSession />} />
          {/* <Route
            path="/app/chat/:expertId/:sessionId"
            element={<ChatSession />}
          /> */}
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default RApp;
