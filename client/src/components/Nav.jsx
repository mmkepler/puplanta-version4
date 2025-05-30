import { Link, useNavigate, NavLink } from "react-router-dom"
import { userAuth } from "../lib/context/AuthContext"

export default function Nav() {
  const {session, signOut} = userAuth()
  const navigate = useNavigate()
  const handleSignOut = (e) => {
    e.preventDefault()
    signOut()
    navigate("/")
  }
  return (
    <nav id="nav">
      <ul id="nav-ul">
      <li className="nav-links" id="puplanta"><NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Puplanta</NavLink></li>
        <li className="nav-links"><NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>About</NavLink></li>
        <li className="nav-links"><NavLink to="/parks" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Parks</NavLink></li>
        <li className="nav-links"><NavLink to="/stores" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Stores</NavLink></li>
        { !session && <li className="nav-links"><NavLink to="/signin" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Sign In</NavLink></li>}
        { session && <li className="nav-links"><NavLink to="/account" className={({ isActive }) => (isActive ? "active-link" : "inactive-link")}>Account</NavLink></li>}
        {  session &&<li className="nav-links signout" onClick={e => handleSignOut(e)}>Sign Out</li>}
      </ul>
    </nav>
  )
}
