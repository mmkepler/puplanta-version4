import { Link } from "react-router-dom"
import { useState } from "react"
import MobileMenu from "./MobileMenu"
import gradient2 from "../assets/paws-up-gradient2.svg"

export default function MobileNav() {
  const [menu, setMenu] = useState(false)

  const showMenu = (e) => {
    e.preventDefault()
    setMenu(true)
  }

  const closeMenu = (e) => {
    e.preventDefault()
    setMenu(false)
  }


  return (
    <>
    {!menu && <nav id="mobile-nav">
      <ul id="mobile-nav-ul">
      <li className="mobile-links" id="puplanta"><Link to="/">Puplanta</Link></li>
      <li className="mobile-links"><button id="hamburger" onClick={e => showMenu(e)}><img id="hamburger-img" src={gradient2} alt="a corgi cartoon corgi head being used as a hamburger menu button"></img></button></li>
      </ul>
    </nav>}
    {menu && <MobileMenu onClick={e => closeMenu(e)}/>}
    </>
  )
}
