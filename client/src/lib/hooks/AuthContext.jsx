import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(undefined);
  
  //Sign in w/password
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({email, password})
      if(error){
        console.log("sign in error ", error)
        return {success: false, error}
      }
      console.log("sign in success ", data)
      return {success: true, data}
    } catch(error){
      console.error("sign in error catch ", error )
    }
  }


  //Sign up w/email & password
const signUpUser = async (email, password) => {
  const {data, error} = await supabase.auth.signUp({email, password})
  if(error){
    console.log("sign up error ", error);
    return {success: false, error}
  }
  return {success: true, data}
}
  

  //Sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut()
    if(error){
      console.log("sign out erro ", error)
    }
  }


  //listen for session change
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [])
  


  return (
    <AuthContext.Provider value={{session, signUpUser, signInUser, signOut}}>{children}</AuthContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(AuthContext)
}