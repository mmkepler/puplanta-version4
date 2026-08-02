import React from 'react'
import errorImg from "../assets/error.jpg"

export default function Error() {
  return (
    <div>
      <div className="title-holder">
        
        <h1 className="title">Woof Error Woof</h1>
      </div>
      <div className="image-holder">
        
        <img id="park-image" src={errorImg} alt="A border collie jumping to catch a frisbee in a field" />
      </div>
      <div className="address-holder">
        <p id="park-address">
          This place doesn't exist
          <br/>
          <a href="https://www.puplanta.com">Click here to go home!</a>
        </p>
      </div>
    </div>
  )
}
