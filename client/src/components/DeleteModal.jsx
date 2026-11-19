import React from 'react'
import { useState } from 'react'
import laika from "../assets/laika_bone.png"
import "../styles/account.css"

export default function DeleteModal() {
  return (
    <div id="delete-modal">
      <section id="delete-section">
        <h2>Your account has been successfully deleted!</h2>
        <p>You will be redirected in a few seconds.</p>
        <img id="laika-delete" src={laika} alt="a fluffy white dogs with pointy ears chewing on a benebone" />
        <p>🐾 Bye Friend! 🐾</p>
      </section>
    </div>
  )
}
