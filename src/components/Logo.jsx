/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
function Logo({width = "100%"}) {
  return (
    <img 
    src="https://www.docplanner.com/img/logo-default-group-en.svg?v=1" 
    alt="Docplanner Group"
    style={{width}}
    />
  )
}

export default Logo