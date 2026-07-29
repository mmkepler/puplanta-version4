import React from 'react'
import paw from "../assets/paws-up-gradient2.svg"

export default function loader() {
  return (
    <div id="loader-holder">
      <img id="loader" src={paw} alt="a gradient colored orange and purple dog paw print representing a loader spinning"/>
      <p>Loading...</p>
    </div>
  )
}
