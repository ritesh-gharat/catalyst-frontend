// AuthLayer.js
import React, { useMemo } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import VerticalNavbar from "../../components/VerticalNavbar/VerticalNavbar";
import SubNavbar from "../../components/SubNavbar/SubNavbar";
import TopNavbar from "../../components/TopNavbar/TopNavbar";
import InputBar from "../../components/InputBar/InputBar";
import { useAuthContext } from "../../context/Auth.Context";
 
function App() {
  // get the current location
  const { pathname } = useLocation();
  // get the user data form the context

  const { authUser } = useAuthContext();

  const mainAppLayout = useMemo(
    () => (
      <>
        <VerticalNavbar />
        <SubNavbar />
        <div className="h-full w-full md:w-[calc(100%-60px-250px)] flex flex-grow flex-col justify-center items-center bg-Primary">
          <TopNavbar />
          <Outlet />
          <div
            className={`w-full h-auto ${pathname === "/app/experts" ? "hidden" : "block"}`}
          >
            <InputBar />
          </div>
        </div>
      </>
    ),
    [authUser, pathname]
  );

  if (authUser === undefined) {
    return null; // Render loading state or null while user info is loading
  }

  // check if the user is logged in
  if (authUser) {
    if (pathname === "/auth/signup" || pathname === "/auth/login") {
      return <Navigate to="/app/learning" replace />;
    } else {
      return mainAppLayout;
    }
  } else {
    if (pathname === "/auth/signup" || pathname === "/auth/login") {
      return <Outlet />;
    } else {
      return <Navigate to="/auth/signup" replace />;
    }
  }
}

export default App;