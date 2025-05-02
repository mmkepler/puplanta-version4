import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'
import { useNavigate } from 'react-router-dom';
import {userAuth} from "../context/AuthContext"
const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {
 const { session, userData, getUserData } = userAuth();
  const userId = userData?.id

    const voteUp = async (id, votes, storeuuid, storeId, type, votesArr, closeModal) => {
      console.log("type", type)
      /*
      id: users id in profiles,
      votes: vote counts for positive and negative votes for parks/stores
      storeuuid: the generated id unique for stores/parks - as opposed to the id I used in original data =>
      storeId
      type: parks/stores string so function can be used for both
      votesObj: users vote history in array form, need to chang name
      */
      console.log("votes ", votes)
      let updatedVotesArr = votesArr || [];
      //let objIndex = updatedVotesArr.findIndex(el => el.id === storeuuid);
      const voteObj = votesArr?.find(el => el.id === storeuuid) || {}
      let updatedVote = {}
      let updatedVoteCount = votes
      
      //console.log("voteObj ", voteObj)

      if(voteObj.up === true && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: false}
        updatedVoteCount.up -=1
        console.log("up true/false votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === false){
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        console.log("up false/false votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === true){
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        updatedVoteCount.down -=1
        console.log("up false/true votecount", updatedVoteCount)
      }else{
        updatedVote = {id: storeuuid, up: true, down: false}
        updatedVoteCount.up +=1
        console.log("up not created votecount", updatedVoteCount)
      }
        console.log("uvc ", updatedVoteCount)

      //console.log("voteObj after switch", updatedVote)
      
      if(updatedVotesArr.length > 0){
        //update vote Obj in array
        let tempIndex = updatedVotesArr.findIndex(el => el.id === storeuuid)
        console.log("up temp index ", tempIndex)

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
        console.log("error in upvote ", error)
      }
      //update votes object with new vote count for park/store
      const {error: countError} = await supabase.from(type).update({votes: updatedVoteCount}).eq("uuid", storeuuid)
      if(countError){
        console.log("countError up", countError)
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
      console.log("votes ", votes)
      let updatedVotesArr = votesArr || [];
      //let objIndex = updatedVotesArr.findIndex(el => el.id === storeuuid);
      const voteObj = votesArr?.find(el => el.id === storeuuid) || {}
      let updatedVote = {}
      let updatedVoteCount = votes
      
      //console.log("voteObj ", voteObj)

      if(voteObj.up === false && voteObj.down === true){
        updatedVote = {id: storeuuid, up: false, down: false}
        updatedVoteCount.down -=1
        console.log("down false/true votecount", updatedVoteCount)
      }else if(voteObj.up === false && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.down +=1
        console.log("down false/false votecount", updatedVoteCount)
      }else if(voteObj.up === true && voteObj.down === false){
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.up -=1
        updatedVoteCount.down +=1
        console.log("down true/false votecount", updatedVoteCount)
      }else{
        updatedVote = {id: storeuuid, up: false, down: true}
        updatedVoteCount.down +=1
        console.log("down not created", updatedVoteCount)
      }
        console.log("uvc down", updatedVoteCount)

      //console.log("voteObj after switch", updatedVote)
      
      if(updatedVotesArr.length > 0){
        //update vote Obj in array
        let tempIndex = updatedVotesArr.findIndex(el => el.id === storeuuid)
        updatedVotesArr[tempIndex] = updatedVote
        //console.log("length > 0 ", updatedVotesArr)
      }else {
        //add 1st vote obj to array
        updatedVotesArr.push(updatedVote)
      }
  
      //console.log("updatedVotesArr ", updatedVotesArr)

      //push updated array to supabase
      const { error } = await supabase.from("profiles").update({[type]: updatedVotesArr}).eq("id", id)
      if(error) {
        console.log("error in downvote ", error)
      }
      //update votes object with new vote count for park/store
      const {error: countError} = await supabase.from(type).update({votes: updatedVoteCount}).eq("uuid", storeuuid)
      if(countError){
        console.log("countError down", countError)
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

/*
const voteUp = async (id, userData, votesObj, storeuuid, storeId, type, userVotes) => {
      console.log("inside voteup userData ", userData)
      //not sure I need it to return
      //console.log(`{${type}: {${storeuuid}: {"up":true,"down":false}}}`)
      console.log("userId ", userData.id)
     //const {data, error } = await supabase.from(type).update({votes: {"up":0,"down":0}}).eq("uuid", storeuuid).select()
     const updateObj = `${type}: {${storeuuid}: {"up": true, "down": false}}`;
     const thisone = userData.id
      //const {error} = await supabase.from("profiles").insert({"parks": {storeuuid: {"up":true,"down":false}}}).eq("id", id)
      //const {data, error} = await supabase.from("profiles").select("parks").eq("id", id)
      const {data, error} = await supabase.from("profiles").update({[type]: {[storeuuid]: {"up":true,"down":false}}}).eq("id", id)
      if(error){
       console.log("error update profiles vote", error)
      }
      console.log("update data vote ", data)
    }



    //handles the vote
  /*const vote = async (choice, votes, storeId, type, userId) => {

      
      const {data, error} = await supabase.from("profiles").select(type).eq("id", userData.id)
      if(error) {
        console.log("error vote Finder ", error)
      }
      if(data?.type?.hasOwnProperty(storeId)){
        //update
      console.log("it has property")
    } else {
      //create property
      console.log("it doesn't have property")
      const {data, error} = supabase.from("profiles").update({storeId: }).eq("id", userData.id)
    }
  }*/

  /*const checkForItem = async (session, storeId, userData, votes, type, choice) => {
    const navigate = useNavigate();
    //console.log("check session ", session)

    //if no session
    if(!session){
      console.log("checkForItem userId no session")
      navigate("/signin")
      }
      //console.log("userData ", userData)
      if(session && !userData){
        //no userData - this should be a rare bug but isn't rare for some reason
        console.log("not finding userData")
        //console.log("storeid ", storeId)
        await getUserData(session.user.id);
        // ADD here function to do voting I'm not sure if it will automatically go to the next if afterards. Refactor?
      }

      if(session && userData){
      
      }
    }*/

      /*
      switch(voteObj){
        //cancel out an upvote
        case voteObj.up === true && voteObj.down === false:
        updatedVote = {id: storeuuid, up: false, down: false}
        break;
        //vote up on a no vote object
        case voteObj.up === false && voteObj.down === false:
          updatedVote = {id: storeuuid, up: true, down: false}
          break;
          //making a negative vote positive
        case voteObj.up === false && voteObj.down === true:
          updatedVote = {id: storeuuid, up: true, down: false}
          break;
          //creating a new vote obj for this store/park with upvote
        default:
          console.log("its hitting the default")
          updatedVote = {id: storeuuid, up: true, down: false}
      }
      
      */