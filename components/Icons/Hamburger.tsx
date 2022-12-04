import React from 'react'

const Hamburger = ({ ...props }) => {
  return (
    <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 0h16v3H0zm0 6h16v3H0zm0 6h16v3H0z" fill="#FFF" fillRule="evenodd"/>
      </svg>
  )
}

export default Hamburger