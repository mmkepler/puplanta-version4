import React from 'react'
import { useEffect } from 'react';
import "../styles/modal.css"
import pawsup from "../assets/paws-up.svg";
import pawsdown from "../assets/paws-down.svg";
import { userAuth } from '../lib/context/AuthContext';
import { userModal } from '../lib/context/ModalContext';


export default function Modal(props) {
  const { session, userData, getUserData} = userAuth()
  //const {checkForItem} = userModal()
  const {voteUp, voteDown} = userModal();
  const {storeId, storeuuid, votes} = props.data;
  console.log("uuid ", storeuuid)
  const type = props.data.type
  const closeModal = props.onClose
  
  console.log("prop ", props)
  
//console.log("storeId", data.data)
  //checkForItem(session, storeId, userData, votes, type )
  /*useEffect((storeId) => {
   checkForItem(session, storeId, userData )
    
  }, []);*/
  
    if(!userData){
      getUserData(session.user.id)
      //console.log("gotUserdata", userData)
    }
  
    console.log("in modal userData ", userData)
  const handleVote = (e, choice, props) => {
    e.preventDefault();
    if(choice === "left"){
      voteUp(session.user.id, votes, storeuuid, storeId, type, userData[0][type], closeModal)
    }
    if(choice === "right") {
      voteDown(session.user.id, votes, storeuuid, storeId, type, userData[0][type], closeModal)
    }
  }


  
  //pass park info here
  //supabase in a modal context to be ued for both
  return (
    <div id="modal">
      <div id="content">
        
      <h1>Modal</h1>
      <p>Modal Info Goes here</p>
      <p>{type}</p>
      <p>{JSON.stringify(votes)}</p>
      {/*<p>{JSON.stringify(userData)}</p>
      <p>{JSON.stringify(session)}</p>*/}
       <h2 id="ratings">Ratings</h2>
            <div >
              <div >
                <p>paws up {votes.up}</p>
                <button className="paws-up paw-vote" id="up" onClick={(e) => handleVote(e, "left")}>
                  <img src={pawsup} alt="a paw icon pointing upward for a positive vote"/>
                </button>
              </div>
              <div >
              <p>paws down {votes.down}</p>
              <button className="paws-down paw-vote" id="down" onClick={(e) => handleVote(e, "right")}>
                <img src={pawsdown} alt="a paw icon pointing downward for a negative vote" />
              </button>
              </div>
            </div>
      </div>
    </div>
  )
}
