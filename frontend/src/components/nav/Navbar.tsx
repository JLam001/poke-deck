import React from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Poke-Deck
        </Link>
        <div>
          <Link
            to="/login"
            className="text-white mr-4 hover:text-gray-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};
