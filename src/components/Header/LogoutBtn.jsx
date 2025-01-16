/* eslint-disable no-unused-vars */
import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/auth.js'
import { logout } from '../../store/authSlice.js'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        try {
            await authServices.logout().then(() => {
            dispatch(logout())
            })
        }
        catch (error) {
            console.error("Error at logging out from header :: " ,error)
        }
    }

  return (
    <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
  )
}

export default LogoutBtn