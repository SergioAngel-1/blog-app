import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Moon, Sun, PenSquare } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";

const Navbar = () => {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <nav className={`${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className={`flex items-center gap-2 text-xl font-semibold ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-800 hover:text-gray-600"
            }`}
          >
            <BookOpen className="w-6 h-6" />
            MiniBlog
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isDarkMode
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              <PenSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Nuevo Post</span>
            </Link>
            <button
              onClick={toggle}
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              aria-label="Cambiar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-white" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
