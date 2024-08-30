import React from "react";

import { useAuthContext } from "../../context/Auth.Context";
import auth from "../../hooks/auth";

function User() {
  const { authUser } = useAuthContext();

  async function handleLogout() {
    const result = await auth.logout();
    console.log(result);
    if (result.message) {
      localStorage.removeItem("authUser");
      window.location.reload();
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold m-5">CATALYST AI</h1>
      <div className="w-96 bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User</h2>
        <div>
          <img
            src={authUser.profilePicture}
            alt="avtar"
            className="w-20 h-20"
          />
          <p>ID: {authUser._id}</p>
          <p>Full Name: {authUser.fullName}</p>
          <p>Username: {authUser.username}</p>
          <p>Email: {authUser.email}</p>
          <button onClick={handleLogout} className="w-32 h-10 bg-red-400 mt-2 cursor-pointer hover:bg-red-500 rounded-lg">Log out</button>
        </div>
      </div>
    </div>
  );
}

export default User;
