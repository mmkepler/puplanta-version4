import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")  //just username might not need 
  const [userData, setUserData] = useState("") //profile data


  //get user Profile data - whole row
  const getUserData = async (id) => {
    const { data, error } = await supabase.from("profiles").select().eq("id", id);
      if(error){
        //console.log("getUserData error ", error)
      }
      setUserData(data)
      return {success: true, data}
  }

  //add username to database
  const addUsername = async (id, username) => {
    const { data, error } = await supabase.from("profiles").update({username: username}).eq("id", id).select()
    if(error) {
      //console.log("error from addUsername")
    }
    setUsername("")
    setUserData(data)
  }

  
  //Sign in w/password
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({email, password})
      if(error){
        //console.log("sign in error ", error)
        return {success: false, error}
      }
      //console.log("sign in success ", data)
      return {success: true, data}
    } catch(error){
      //console.error("sign in error catch ", error )
    }
  }


  //Sign up w/email & password
  const signUpUser = async (email, password, username) => {
    setUsername(username)
    const {data, error} = await supabase.auth.signUp({email, password, options: {
      data: {username}
    }})
    if(error){
      //console.log("sign up error ", error);
      return {success: false, error}
    }
    
    return {success: true, data}
  }
  
  


  //Sign out
  const signOut = () => {
    const { error } = supabase.auth.signOut()
    if(error){
      //console.log("sign out error ", error)
    }
  }


  //listen for session change
  useEffect(() => {
  let mounted = true

  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!mounted) return
    setSession(session)
    setLoading(false)
  })

  const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
    setSession(nextSession)
  })

  return () => {
    mounted = false
    sub.subscription.unsubscribe()
  }
}, [])

    
  
    //reset state
    const resetState = () => {
      setUsername("")
      setUserData("")
    }

    const resetPassword = async (email) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo: "http://localhost:5173/validate"})
      if(error){
        //
        // console.log("error in resetPassword in auth ", error)
        return  {success: false, error}
      }
      return {success: true, data}
    }

    const validate = async ({type, token}) => {
        const {data, error} = await supabase.auth.verifyOtp({type, token})
        if(error){
          return {success: false, data}
        }
        return {success: true, data}
    }

  return (
    <AuthContext.Provider value={{session, loading, signUpUser, signInUser, signOut, resetState, username, userData, getUserData, addUsername, validate, resetPassword}}>{children}</AuthContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(AuthContext)
}


/*
//listen for session change
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    
    });
  }, [])
 */