import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout, checkIsAuth } from '../reducers/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)

  const logoutHandler = () => {
    try {
      dispatch(logout())
      window.localStorage.removeItem('token')
      toast('logged out')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="navbar">
      <span className="logo">Logo</span>
      
    {
      isAuth && (
      <div className='navbarAuthContainer'>
        <div className="navbarAuthItem">
          <NavLink 
            className="NavLink"
            to={"/"}
            style = {({ isActive }) => ({
              color: isActive ? '#FFB901' : '#FFE2C8',
              textDecoration: isActive ? "underline" : "none",
            })}>
            Home
          </NavLink>
        </div>
        <div className="navbarAuthItem">
          <NavLink 
            className="NavLink"
            to={"/post/user/me"}
            style = {
              ({ isActive }) => ({
                color: isActive ? '#FFB901' : '#FFE2C8',
                textDecoration: isActive ? "underline" : "none",
              })
            }>
            My posts
          </NavLink>
        </div>
        <div className="navbarAuthItem">
          <NavLink
            className="NavLink" 
            to={"/addpost"}
            style = {({ isActive }) => ({
              color: isActive ? '#FFB901' : '#FFE2C8',
              textDecoration: isActive ? "underline" : "none",
            })}>
            Create post
          </NavLink>
        </div>
      </div>)
    }
      <div className="logoutButton" >
        {isAuth ? (
          <button className="logoutButton" onClick={logoutHandler}>Logout</button>
        ) : (
          <Link
          style = {{
            color: '#FFE2C8',
            textDecoration: "none",
            alignItems: "center",
          }}  
          to={'/login'} 
          > Login </Link>
        )}
      </div>
    </div>
  )
}
