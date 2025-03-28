import React from 'react'
import { useLocation } from 'react-router-dom';
import "../styles/parks.css";
import pawsup from "../assets/paws-up.svg";
import pawsdown from "../assets/paws-down.svg";

export default function Park() {
  const {state} = useLocation();
  
  console.log("props ", state);
  const {address, google, image, title, website, votes} = state.data;
  return (
    <div id="park-page">
      <div id="park-info">
        <div id="park-col">
          <h1>{title}</h1>
          <img id="park-image" src={image} alt={`image of ${title}`} />
          <address id="park-address">
            {address.slice(0, address.indexOf(",") + 1)}
            <br/>
            {address.slice(address.indexOf(",") + 1)}
          </address>
          <div id="park-col-2">
            <a href={website} rel="noopener noreferer" target="_blank">website</a>
            <a href={google} rel="noopener noreferer" target="_blank">directions</a>
          </div>
          <h2 id="ratings">Ratings</h2>
          <div id="votes">
            <div id="upvote">
              <p>paws up {votes.up}</p>
              <button className="paws-up">
                <img src={pawsup} alt="a paw icon pointing upward for a positive vote"/>
              </button>
            </div>
            <div id="downvote">
            <p>paws down {votes.down}</p>
            <button className="paws-down">
              <img src={pawsdown} alt="a paw icon pointing downward for a negative vote" />
            </button>
            </div>
          </div>
          <button id="park-vote-button">Vote on this park</button>
        </div>
      </div>
    </div>
  )
}
