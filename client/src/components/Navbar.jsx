import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-30 flex justify-center opacity-90 px-4 animate-fadeIn">
      <nav className="max-w-7xl w-full backdrop-blur-md bg-white/90 rounded-2xl shadow-2xl border-2 border-black/30 px-6 py-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center gap-3 animate-fadeIn">
            <img src="navbar.png" className="h-16 w-16 rounded-lg" alt="Logo" />
            <span className="font-momo text-3xl text-black">
              MGNREGA Data Dashboard
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20"
            aria-controls="navbar-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className={`${isOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto`}
            id="navbar-menu"
          >
            <ul className="flex flex-col font-momo p-4 md:p-0 mt-4 md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 text-black">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-2xl rounded-lg hover:underline hover:bg-black/ transition-colors"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 text-2xl rounded-lg hover:bg-black/10 transition-colors"
                >
                  About
                </Link>
              </li> */}
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 text-2xl rounded-lg hover:bg-black/ hover:underline transition-colors"
                >
                   View Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
