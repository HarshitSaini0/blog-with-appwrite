/* eslint-disable no-unused-vars */
import React from "react";
import Container from "../Container/Container";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

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
        <header className="py-4 shadow-md bg-white">
                <Container>
                        <nav className="flex items-center justify-between">
                                <div className="mr-6">
                                        <Link to="/">
                                                <Logo width="200px" />
                                        </Link>
                                </div>
                                <div className="block lg:hidden">
                                        <button
                                                className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-white hover:bg-blue-500"
                                                onClick={() => setIsOpen(!isOpen)}
                                        >
                                                <svg
                                                        className="fill-current h-3 w-3"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                >
                                                        <title>Menu</title>
                                                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                                </svg>
                                        </button>
                                </div>
                                <ul
                                        className={`${
                                                isOpen ? "block" : "hidden"
                                        } lg:flex ml-auto space-x-4`}
                                >
                                        {navItems.map((item) =>
                                                item.active ? (
                                                        <li key={item.name}>
                                                                <button
                                                                        onClick={() => navigate(item.slug)}
                                                                        className="px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-500 rounded transition duration-300"
                                                                >
                                                                        {item.name}
                                                                </button>
                                                        </li>
                                                ) : null
                                        )}
                                        {authStatus && (
                                                <li>
                                                        <LogoutBtn />
                                                </li>
                                        )}
                                </ul>
                        </nav>
                </Container>
        </header>
);
}

export default Header;
