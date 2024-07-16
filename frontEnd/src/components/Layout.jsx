// src/components/Layout.jsx
import React from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

const Layout = ({ children, user }) => {
  const navigate = useNavigate();

  const handleSignOut = (event) => {
    event.preventDefault();
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <header className="p-4 border-b border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Creative Notes App</h1>
            <span className="text-gray-400">Keep Your Notes Here!</span>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-xl">You are not logged in!</p>
          <Link to={"login"}>
            <button className="bg-white text-black mt-4 rounded-xl px-6 py-2 hover:bg-gray-200 transition duration-200">
              Login
            </button>
          </Link>
        </main>
        <footer className="p-4 border-t border-gray-700 text-center">
          <p>Created with &#9829; by Aman Soni</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <span className="font-bold">
              {user.email.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold ">Creative Notes App</h1>
            <span className="text-gray-400">Keep Your Notes Here!</span>
          </div>
        </div>
        <form onSubmit={handleSignOut}>
          <button
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-200"
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="p-4 border-t border-gray-700 text-center">
        <p>Created with &#9829; by Aman Soni</p>
      </footer>
    </div>
  );
};

export default Layout;
