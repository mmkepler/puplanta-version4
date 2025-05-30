import { userAuth } from "../lib/context/AuthContext"
import { Link, useNavigate, NavLink } from "react-router-dom"
import { useState } from "react"

export default function MobileMenu(props) {
  const { session, signOut} = userAuth()
  const navigate = useNavigate()

  const handleSignOut = (e) => {
    e.preventDefault()
    signOut()
    navigate("/")
    props.onClick(e)
  }

  return (
    <nav id="mobile-menu">
      
      <ul id="mobile-menu-ul">
      <li className="mobile-nav-links" id="puplanta" onClick={e => props.onClick(e)}><NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Puplanta</NavLink></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>About</NavLink></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><NavLink to="/parks" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Parks</NavLink></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><NavLink to="/stores" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Stores</NavLink></li>
        { !session && <li className="mobile-nav-links" onClick={e => props.onClick(e)}><NavLink to="/signin" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Sign In</NavLink></li>}
        { session && <li className="mobile-nav-links" onClick={e => props.onClick(e)}><NavLink to="/account" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Account</NavLink></li>}
        {  session &&<li className="mobile-nav-links signout" onClick={e => handleSignOut(e)}>Sign Out</li>}
      </ul>
      <span onClick={e => props.onClick(e)} id="mobile-close">X</span>
    </nav>
  )
}
