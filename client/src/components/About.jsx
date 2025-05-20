import { useState } from "react"
import Laika2 from "../assets/Laika2_t.png"
import Nimbus2 from "../assets/Nimby2_t.png"
import Drogon2 from "../assets/Drogon2_t.png"
import LaikaV from "../assets/Laika-vid.mp4"
import NimbusV from "../assets/Nimby-vid.mp4"
import DrogonV from "../assets/Drogon-vid.mp4"
import "../styles/about.css"

export default function About() {
  const [slideIndex, setSlideIndex] = useState(1);

  const next = () => {
    if(slideIndex < 3){
      setSlideIndex(slideIndex + 1)
    }
  }
  
  const previous = () => {
    if(slideIndex > 1) {
      setSlideIndex(slideIndex - 1)
    }
  }
  
  const contentArr = [<div className="slider-media">
    <img className="about-img" src={Laika2} alt="A white and orangey blonde fluffy dog with pointy ears looking sweetly towards the camera with her head sitting on the side of a bed"/>
    <video className="about-video" width="225" height="225" controls>
      <source src={LaikaV} type="video/mp4"></source>
    </video>
  </div>,
  <div className="slider-media">
    <img className="about-img" src={Nimbus2} alt="A fluffy black small dog looking down at the camera"/>
    <video className="about-video" width="225" height="225" controls>
    <source src={NimbusV} type="video/mp4"></source>
  </video>
    </div>,
  <div className="slider-media">
    <img className="about-img" src={Drogon2} alt="A sleek black German Shepherd looking at a treat held by his owner"/>
    <video className="about-video" width="225" height="225" controls>
      <source src={DrogonV} type="video/mp4"></source>
    </video>
  </div>
]

const dogArr = ["Laika", "Nimubs", "Drogon"]

  return (
    <div id="about">
      <h1>Welcome to <span className="leckerli">Puplanta!</span></h1>
      <p>This site was created as one of my first web development practice projects and has been rebuilt several times. <br></br>
      This latest iteration has been built in React with Supabase used as the backend. </p>
      <h2>What can I do on this site?</h2>
      <ul id="site-actions">
        <li>This site will give your a list of dog shops and parks in the Greater Atlanta area.</li>
        <li>You can find the locations on a map, and visit an individual page to get more information.</li>
        <li>You can also upvote or downvote locations you have visited.</li>
        <li>Votes are saved and the number of upvotes and downvotes are displayed on the locations page.</li>
      </ul>
      
      <h3>This website is dedicated to my 3 dogs: Nimbus, Laika and Drogon.</h3>
        <div id="slider-container">
        
        {contentArr.map((content, index) => (
          <div className="slide-content" key={index}
          style={{display: index + 1 === slideIndex ? "block" : "none"}}
          >
          <p className="slide-num">{`${index + 1}/${contentArr.length}`}</p>
          {content}
          <p className="slider-text">{dogArr.index}</p>
          </div>
        ))}

        <div id="controls">
          <button className="previous" onClick={previous}></button>
          <div className="circles">
            {contentArr.map((__, index) => (
              <span key={index} className={`circle${index + 1 === slideIndex ? " active" : ""}`} onClick={() => setSlideIndex(index += 1)}></span>
            ))}
          </div>
          <button className="next" onClick={next}></button>
        </div>
      </div>
    </div>
  )
}
