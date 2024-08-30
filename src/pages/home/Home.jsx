import React from "react";
import bgSvg from "../../assets/bg.svg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative w-full h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgSvg})`,
          opacity: 0.08,
        }}
      ></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center">
          CATALYST
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-2 text-center">
          AI based Tutor for Realtime Personalize Learning
        </p>
        <span className="text-base mb-4 opacity-60 text-center">
          Instant help with homework, assignments, and concepts anytime,
          anywhere.
        </span>
        <Link
          to="/app/user"
          class="w-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-full transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
