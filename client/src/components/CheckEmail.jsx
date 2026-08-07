import React from 'react'
import "../styles/parks.css"
import laikapaw from "../assets/laikacrossedpaw.png"


export default function () {
  return (
    <div id="park-page">
      <h2>Please check your email</h2>
      <img src={laikapaw} alt=""/>
      <p>We have sent you a link to sign in</p>
    </div>
  )
}
