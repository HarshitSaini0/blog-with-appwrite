/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
function Logo({width = "100%"}) {
  return (
    <img 
    src="logo.svg" 
    alt=""
    style={{width}}
    />
  )
}

export default Logo