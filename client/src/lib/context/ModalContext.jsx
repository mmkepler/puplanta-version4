import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom';
import {userAuth} from "./AuthContext"
const ModalContext = createContext();


export const ModalContextProvider = ({children}) => {
 const { session, userData, getUserData } = userAuth();
  const userId = userData?.id

  //user upvotes park/store
  //Takes in userid, the park/store's vote obj, the park/stores's uuid, type, users vote array, the close function, the direction a string either "up" or "down"
  const updateVote = async (id, locationVotes, storeuuid, type, userVotesArr, closeModal, direction) => {

    //The locations current up and down votes total
    let currLocVotes = locationVotes ?? {id: storeuuid, up: 0, down: 0}
    //users vote history for location or bland entry
    let currUserVote = userVotesArr.find((vote) => vote.id === storeuuid) ?? {id: storeuuid, up: false, down: false}
    //users vote history array
    let currUserVotesArr = userVotesArr

    let updatedVote = {...currUserVote}

    //check the users vote 
    if (direction === "up") {
    if (currUserVote.up) {
      // Second upvote click: remove the upvote
      updatedVote.up = false;
      currLocVotes.up -= 1;
    } else {
      // Add an upvote
      updatedVote.up = true;
      currLocVotes.up += 1;

      // Remove an existing downvote when switching
      if (currUserVote.down) {
        updatedVote.down = false;
        currLocVotes.down -= 1;
      }
    }
  } else if (direction === "down") {
    if (currUserVote.down) {
      // Second downvote click: remove the downvote
      updatedVote.down = false;
      currLocVotes.down -= 1;
    } else {
      // Add a downvote
      updatedVote.down = true;
      currLocVotes.down += 1;

      // Remove an existing upvote when switching
      if (currUserVote.up) {
        updatedVote.up = false;
        currLocVotes.up -= 1;
      }
    }
  }

    //add updated vote to users vote arr
    let updatedVotesArr = [...currUserVotesArr]
    const index = updatedVotesArr.findIndex(vote => vote.id === storeuuid)

    //if it doesn't exist add new vote obj
    if(index === -1){
      updatedVotesArr.push(updatedVote)
    } else {
      updatedVotesArr[index] = updatedVote
    }
    let errorTracker = []

    //add the updated votes array to profile
    const {error: profileError} = await supabase.from("profiles").update({[type]: updatedVotesArr}).eq("id", id)
    if(profileError){
      console.log("profile error ", profileError)
      errorTracker.push({error: "There was an error updating the user profile voting information. Please refresh and try again"})
      return {success: false, error: errorTracker}
    }

    const {error: locationError} = await supabase.from(type).update({votes: currLocVotes}).eq("uuid", storeuuid)
    if(locationError){
      console.log("Location Error ", locationError)
      errorTracker.push({error: "There was an error updating the location's voting data. Please refresh and try again"})
    }
    if(errorTracker.length){
      return {success: false, errors: errorTracker}
    }else {
      {success: true}
    }
  }


  return (
    <ModalContext.Provider value={{updateVote}}>{children}</ModalContext.Provider>
  )
}

export const userModal = () => {
  return useContext(ModalContext)
}

 