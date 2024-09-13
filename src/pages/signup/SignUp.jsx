import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Auth.Context";
import toast from "react-hot-toast";
import auth from "../../hooks/auth";

function SignUp() {
  const { setAuthUser } = useAuthContext();

  const [inputes, setInputs] = useState({
    fullName: "",
    username: "",
    gender: "male",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [verifyPassword, setverifyPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (verifyPassword) {
      toast.error("Password does not match");
      return;
    }

    const result = await auth.signup(inputes);
  
    if (result) {
      localStorage.setItem("authUser", JSON.stringify(result));
      setAuthUser(result);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center flex-col bg-gray-100">
      <h1 className="text-4xl font-bold m-5">CATALYST AI</h1>
      <div className="w-96 bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Full Name"
            value={inputes.fullName}
            onChange={(e) =>
              setInputs({ ...inputes, fullName: e.target.value })
            }
          />
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
          <select
            className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={(e) =>
              setInputs({ ...inputes, gender: e.target.value.toLowerCase() })
            }
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          <input
            type="email"
            className="w-full px-3 py-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            placeholder="Email"
            value={inputes.email}
            onChange={(e) => setInputs({ ...inputes, email: e.target.value })}
          />
          <input
            type="password"
            className={`w-full px-3 py-2 my-2 border border-gray-300 rounded-md ${
              verifyPassword ? "outline-none ring-2 ring-red-500" : ""
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
            placeholder="Password"
            value={inputes.password}
            onChange={(e) =>
              setInputs({ ...inputes, password: e.target.value })
            }
          />
          <input
            type="password"
            className={`w-full px-3 py-2 my-2 border border-gray-300 rounded-md ${
              verifyPassword ? "outline-none ring-2 ring-red-500" : ""
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
            placeholder="Confirm Password"
            value={inputes.confirmPassword}
            onChange={(e) => {
              inputes.password === e.target.value
                ? setverifyPassword(false)
                : setverifyPassword(true);
              setInputs({ ...inputes, confirmPassword: e.target.value });
            }}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account{" "}
          <Link
            to="/auth/login"
            className="ml-1 text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
