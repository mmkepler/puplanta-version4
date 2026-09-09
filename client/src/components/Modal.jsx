import React from 'react'
import { useEffect, useState } from 'react';
import "../styles/modal.css"
import pawsup from "../assets/paws-up.svg";
import pawsdown from "../assets/paws-down.svg";
import { userAuth } from '../lib/context/AuthContext';
import { userModal } from '../lib/context/ModalContext';

export default function Modal(props) {
  const [error, setError] = useState("")
  const { session, userData, getUserData} = userAuth()
  const {updateVote} = userModal();
  const {storeId, storeuuid, votes} = props.data;
  const type = props.data.type
  const closeModal = props.onClose
  
  const handleEscape = (event) => {
    if(event.key === "Escape"){
      props.onClose()
    }
  }

  //check for escape to close
  useEffect(() => {
    getUserData(session.user.id)
    window.addEventListener("keydown", handleEscape)
  }, [])

  //console.log("userDataArr", userData[type])

  if(!userData){
    getUserData(session.user.id)
  }

  const handleVote = async (e, choice) => {
    e.preventDefault();
    //console.log("choice right ", `session ${session.user.id}`, `votes ${votes}`, `storeuuid ${storeuuid}`, `storeId ${storeId}`, `type ${type}`, `userData ${userData[0][type]}`)
      let results = await updateVote(session.user.id, votes, storeuuid, type, userData[type] || [], closeModal, choice)
      if(!results || results.success === false){
        setError(results?.errors?.map((el ) => el.error).join (" ") || "There was an error submitting your vote")
      }else{
      closeModal()
      return
      }
  }

  return (
    <div id="modal" onClick={props.onClose}>
      <div id="content" onClick={e => e.stopPropagation()}>
        <div id="close-div">
         <button id="modal-close" onClick={props.onClose}>X</button>
        </div>
        {error ? <p>{error}</p> : 
        <div>
          <h1>Vote!</h1>
          <p>How did you feel about your visit to <br/><strong>{props.data.title}</strong></p>
          <img id="modal-img" src={props.data.image} alt={`An image of ${props.data.title}`}/>
          <h2 id="ratings">chose upvote or downvote</h2>
            <div id="ratings-row">
              <div>
                <p>paws up {votes.up}</p>
                <button className="paws-up paw-vote" id="up" onClick={(e) => handleVote(e, "up")}>
                  <img src={pawsup} alt="a paw icon pointing upward for a positive vote"/>
                </button>
              </div>
            <div>
              <p>paws down {votes.down}</p>
              <button className="paws-down paw-vote" id="down" onClick={(e) => handleVote(e, "down")}>
                <img src={pawsdown} alt="a paw icon pointing downward for a negative vote" />
              </button>
            </div>
            </div>
          </div>
          }
      </div>
    </div>
  )
}
