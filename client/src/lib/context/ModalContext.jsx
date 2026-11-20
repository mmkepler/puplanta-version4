import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";
import {userAuth} from "./AuthContext";
const ModalContext = createContext();

export const ModalContextProvider = ({children}) => {
 const { session, userData, getUserData } = userAuth();
 const userId = userData?.id;

  //user upvotes park/store
  //Takes in userid, the park/store's vote obj, the park/stores's uuid, type, users vote array, the close function, the direction a string either "up" or "down"
  const updateVote = async (id, locationVotes, storeuuid, type, userVotesArr, choice) => {
    const response = await axios.post("http://localhost:7005/api/updatevote", {id, locationVotes, storeuuid, type, userVotesArr, choice});
    return response.data;
  }

  return (
    <ModalContext.Provider value={{updateVote}}>{children}</ModalContext.Provider>
  )
}

export const userModal = () => {
  return useContext(ModalContext);
}


