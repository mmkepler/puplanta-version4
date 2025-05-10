import { userAuth } from "../lib/context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function MobileMenu(props) {
  const { session, signOut} = userAuth()
  const navigate = useNavigate()
  console.log("props ", props)

  const handleSignOut = (e) => {
    e.preventDefault()
    signOut()
    navigate("/")
    props.onClick(e)
  }


  return (
    <nav id="mobile-menu">
      
      <ul id="mobile-menu-ul">
      <li className="mobile-nav-links" id="puplanta" onClick={e => props.onClick(e)}><Link to="/">Puplanta</Link></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><Link to="/about">About</Link></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><Link to="/parks">Parks</Link></li>
        <li className="mobile-nav-links" onClick={e => props.onClick(e)}><Link to="/stores">Stores</Link></li>
        { !session && <li className="mobile-nav-links" onClick={e => props.onClick(e)}><Link to="/signin">Sign In</Link></li>}
        { session && <li className="mobile-nav-links" onClick={e => props.onClick(e)}><Link to="/account">Account</Link></li>}
        {  session &&<li className="mobile-nav-links signout" onClick={e => handleSignOut(e)}>Sign Out</li>}
      </ul>
      <span onClick={e => props.onClick(e)} id="mobile-close">X</span>
    </nav>
  )
}
