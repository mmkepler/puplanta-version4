import puplanta from "../assets/puplanta.png"
import { Link } from "react-router-dom"

export default function Nav() {
  return (
    <nav id="nav">
      <ul id="nav-ul">
        <li className="nav-links"><Link to="/about">About</Link></li>
        <li className="nav-links"><Link to="/parks">Parks</Link></li>
        <li className="nav-links" id="puplanta"><span><Link to="/"><img id="puplanta-logo" src={puplanta} alt="puplanta with a corgi head at the start and a corgi butt at the end" /></Link></span></li>
        <li className="nav-links"><Link to="/stores">Stores</Link></li>
        <li className="nav-links"><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  )
}
