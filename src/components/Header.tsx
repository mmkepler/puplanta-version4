import React from 'react'
import "../styles/header.css"
import Link from 'next/link'
//import WebHeader from './WebHeader'
//import MobileHeader from './MobileHeader'

export default function Header() {
  return (
    <header id="nav">
      <ul id="header">
        <li><Link href="/parks">Parks</Link></li>
        <li><Link href="/stores">Stores</Link></li>
        <li id="puplanta"><Link href="/">Puplanta</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/account">Account</Link></li>
        <li id="toggle">
          <button id="menu">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </li>
      </ul>
    </header>
  )
}
