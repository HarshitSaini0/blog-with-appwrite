/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function Protected({ children,authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status)

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    if (authStatus !== authentication && authentication) {
      navigate('/login')
    } else if (authStatus !== authentication && !authentication) {
      navigate('/')
    }

    setLoader(false);
  },[authStatus,authentication,navigate])

  
  return loader ? <h1>Loading...</h1> : <>{children}</>   
}

export default Protected