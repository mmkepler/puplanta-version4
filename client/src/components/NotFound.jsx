import React from 'react'
import NimbusM from "../assets/Nimbus-missing.png"
import "../styles/notfound.css"
import { Link } from 'react-router-dom'
import pawsup from "../assets/paws-up.svg"

export default function NotFound() {
  return (
    <div id="not-found">
      <h1 className="leckerli">Not Found 404!</h1>
      <div id="missing-poster">
        <p id="missing-title">MISSING PAGE</p>
        <img src={NimbusM} alt="A fluffy large pomeranian with a suprised look. His mouth is open and two bottom fangs are visible."/>
        <br/>
        <span id="missing-name"><img src={pawsup} height="30"/> <p className="missing-info">NAME: 404</p ><img height="30" src={pawsup}/></span>
        <Link to="/" className="missing-info">Please click here to get him get back home</Link>
      </div>
    </div>
  )
}
