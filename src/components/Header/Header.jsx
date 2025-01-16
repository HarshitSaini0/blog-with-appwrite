/* eslint-disable no-unused-vars */
import React from 'react'
import Container from "../Container/Container"
import Logo from "../Logo"
import {Link} from "react-router-dom"
import LogoutBtn from './LogoutBtn'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]

return (
    <header className='py-4 shadow-md bg-white'>
            <Container>
                    <nav className='flex items-center'>
                            <div className='mr-6'>
                                    <Link to="/">
                                            <Logo width='200px' />
                                    </Link>
                            </div>
                            <ul className='flex ml-auto space-x-4'>
                                    {
                                            navItems.map((item) => item.active ? (
                                                    <li key={item.name}>
                                                            <button
                                                            onClick={() => navigate(item.slug)}
                                                            className='px-4 py-2 text-gray-700 hover:text-white hover:bg-blue-500 rounded transition duration-300'
                                                            >
                                                                    {item.name}
                                                            </button>
                                                    </li>
                                            ) : null)
                                    }
                                    {authStatus && (
                                            <li>
                                                    <LogoutBtn />
                                            </li>
                                    )}
                            </ul>
                    </nav>
            </Container>
    </header>
)
}

export default Header