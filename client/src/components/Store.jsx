import React, { useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/stores.css"
import "../styles/parks.css"
import pawsup from "../assets/paws-up.svg"
import pawsdown from "../assets/paws-down.svg"
import Modal from './Modal'
import { userAuth } from "../lib/context/AuthContext"

export default function Store(props) {
  const {state} = useLocation();
  const [modalOpen, setModalOpen] = useState(false );
  const {session, userData, getUserData} = userAuth()
  const {address, id, google, image, title, uuid, votes, website} = state.data
  const navigate = useNavigate()

  const checkSession = (e) => {
    e.preventDefault()
    if(!session){
      console.log("park no session")
      navigate("/signin")
    } else {
      setModalOpen(true);
    }
  }
    
    //console.log("props ", state);
    return (
      <div id="park-page">
            <div id="park-info">
              {modalOpen && <Modal onClose={() => setModalOpen(false)} data={{storeId: id, storeuuid: uuid, votes: votes, type: "stores"}}/>}
              <div id="park-col">
                <h1>{title}</h1>
                <p>userData:  {JSON.stringify(userData)}</p>
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
                <button id="park-vote-button" onClick={(e) => checkSession(e)}>Vote on this park</button>
              </div>
            </div>
          </div>
    )
}
