import puplanta from "../assets/puplanta.png"
import { Link, useNavigate } from "react-router-dom"
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
      <li className="nav-links" id="puplanta"><Link to="/">Puplanta</Link></li>
        <li className="nav-links"><Link to="/about">About</Link></li>
        <li className="nav-links"><Link to="/parks">Parks</Link></li>
        <li className="nav-links"><Link to="/stores">Stores</Link></li>
        { !session && <li className="nav-links"><Link to="/signin">Sign In</Link></li>}
        { session && <li className="nav-links"><Link to="/account">Account</Link></li>}
        {  session &&<li className="nav-links signout" onClick={e => handleSignOut(e)}>Sign Out</li>}
      </ul>
    </nav>
  )
}
