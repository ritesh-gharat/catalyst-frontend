import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Auth.Context";

import auth from "../../hooks/auth";

function LogIn() {
  const { setAuthUser } = useAuthContext();

  const [inputes, setInputs] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputes);
    const result = await auth.login(inputes);
    console.log(result);

    if (result) {
      localStorage.setItem("authUser", JSON.stringify(result));
      setAuthUser(result);
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col bg-gray-100">
      <h1 className="text-4xl font-bold m-5">CATALYST AI</h1>
      <div className="w-96 bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Username"
            value={inputes.username}
            onChange={(e) =>
              setInputs({ ...inputes, username: e.target.value })
            }
          />
          <input
            type="password"
            className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Password"
            value={inputes.password}
            onChange={(e) =>
              setInputs({ ...inputes, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account{" "}
          <Link
            to="/auth/signup"
            className="ml-1 text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
