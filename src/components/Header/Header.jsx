/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Container from "../Container/Container";
import Logo from "../Logo.jsx";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../../store/themeSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.theme);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-6">
            <Link to="/" className="flex items-center pl-3">
              <Logo width="100px" className="dark:invert" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 p-6">
            <ul className="flex space-x-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-300 font-medium"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            
            <div className="flex items-center space-x-4 ml-4">
              {/* Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="w-12 h-6 rounded-full p-1 bg-gray-200 dark:bg-gray-600 relative transition-colors duration-300"
              >
                <div className={`relative bottom-1 w-5 h-5 rounded-full bg-white dark:bg-gray-300 shadow-md transform transition-transform duration-300 ${
                  currentTheme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`}>
                  {currentTheme === 'dark' ? (
                    <FaMoon className="w-3 h-3 mx-auto mt-0.5 text-gray-800 relative top-1" />
                  ) : (
                    <FaSun className="w-3 h-3 mx-auto mt-0.5 text-yellow-500 relative top-1" />
                  )}
                </div>
              </button>

              {authStatus && <LogoutBtn />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
            >
              {currentTheme === 'dark' ? (
                <FaMoon className="w-5 h-5 text-gray-300" />
              ) : (
                <FaSun className="w-5 h-5 text-yellow-500" />
              )}
            </button>

            <button
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pt-4 pb-2`}>
          <ul className="space-y-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn mobile />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
};

export default Header;