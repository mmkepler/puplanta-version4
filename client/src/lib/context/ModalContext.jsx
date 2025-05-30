import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom';
import {userAuth} from "./AuthContext"
const ModalContext = createContext();


export const ModalContextProvider = ({children}) => {
 const { session, userData, getUserData } = userAuth();
  const userId = userData?.id

    const voteUp = async (id, votes, storeuuid, storeId, type, votesArr, closeModal) => {
      /*
      id: users id in profiles,
      votes: vote counts for positive and negative votes for parks/stores
      storeuuid: the generated id unique for stores/parks - as opposed to the id I used in original data =>
      storeId
      type: parks/stores string so function can be used for both
      votesObj: users vote history in array form, need to chang name
      */
      let updatedVotesArr = votesArr || [];
      //let objIndex = updatedVotesArr.findIndex(el => el.id === storeuuid);
      const voteObj = votesArr?.find(el => el.id === storeuuid) || {}
      let updatedVote = {}
      let updatedVoteCount = votes

      if(voteObj.up === true && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: false}
        updatedVoteCount.up -=1
        //console.log("up true/false votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === false){
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        //console.log("up false/false votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === true){
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        updatedVoteCount.down -=1
        //console.log("up false/true votecount", updatedVoteCount)
      }else{
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        //console.log("up not created votecount", updatedVoteCount)
      }
        //console.log("uvc ", updatedVoteCount)

        //console.log("voteObj after switch", updatedVote)
      
      if(updatedVotesArr.length > 0){
        //update vote Obj in array
        let tempIndex = updatedVotesArr.findIndex(el => el.id === storeuuid)
        //console.log("up temp index ", tempIndex)

        if(tempIndex === -1){
          updatedVotesArr.push(updatedVote)
        }else {
          updatedVotesArr[tempIndex] = updatedVote
        }

      }else {
        //add 1st vote obj to array
        updatedVotesArr.push(updatedVote)
      }

      //push updated array to supabase
      const { error } = await supabase.from("profiles").update({[type]: updatedVotesArr}).eq("id", id)
      if(error) {
       // console.log("error in upvote ", error)
      }
      //update votes object with new vote count for park/store
      const {error: countError} = await supabase.from(type).update({votes: updatedVoteCount}).eq("uuid", storeuuid)
      if(countError){
       // console.log("countError up", countError)
      }
      //Add a loading screen
     closeModal()
    }
    
    const voteDown = async (id, votes, storeuuid, storeId, type, votesArr, closeModal) => {
      /*
      id: users id in profiles,
      votes: vote counts for positive and negative votes for parks/stores
      storeuuid: the generated id unique for stores/parks - as opposed to the id I used in original data =>
      storeId
      type: parks/stores string so function can be used for both
      votesObj: users vote history in array form, need to chang name
      */
      
      let updatedVotesArr = votesArr || [];
      //let objIndex = updatedVotesArr.findIndex(el => el.id === storeuuid);
      const voteObj = votesArr?.find(el => el.id === storeuuid) || {}
      let updatedVote = {}
      let updatedVoteCount = votes

      if(voteObj.up === false && voteObj.down === true){
        updatedVote = {id: storeuuid, up: false, down: false}
        updatedVoteCount.down -=1
        //console.log("down false/true votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.down +=1
        //console.log("down false/false votecount", updatedVoteCount)
      }else if(voteObj.up === true && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.up -=1
        updatedVoteCount.down +=1
        //console.log("down true/false votecount", updatedVoteCount)
      }else{
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.down +=1
        //console.log("down not created", updatedVoteCount)
      }
     
      
      if(updatedVotesArr.length > 0){
        //update vote Obj in array
        let tempIndex = updatedVotesArr.findIndex(el => el.id === storeuuid)
        //console.log("up temp index ", tempIndex)

        if(tempIndex === -1){
          updatedVotesArr.push(updatedVote)
        }else {
          updatedVotesArr[tempIndex] = updatedVote
        }
       
        //console.log("length > 0 ", updatedVotesArr)
      }else {
        //add 1st vote obj to array
        updatedVotesArr.push(updatedVote)
      }
  
      //console.log("updatedVotesArr ", updatedVotesArr)

      //push updated array to supabase
      const { error } = await supabase.from("profiles").update({[type]: updatedVotesArr}).eq("id", id)
      if(error) {
        //console.log("error in downvote ", error)
      }
      //update votes object with new vote count for park/store
      const {error: countError} = await supabase.from(type).update({votes: updatedVoteCount}).eq("uuid", storeuuid)
      if(countError){
        //console.log("countError down", countError)
      }
      //Add a loading screen
      closeModal()
    }

  return (
    <ModalContext.Provider value={{voteUp, voteDown}}>{children}</ModalContext.Provider>
  )
}

export const userModal = () => {
  return useContext(ModalContext)
}
