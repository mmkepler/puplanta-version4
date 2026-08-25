import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'


const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")  //just username might not need 
  const [userData, setUserData] = useState("") //profile data
  const [imageUrl, setImageUrl] = useState(null)


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

  /* Since I am using Supabase free tier and want to protect my usage, I am uploading images to a private storage bucket. 
  It would be much easier to write code to do a private bucket, but since I can't afford to pay for all my portfolio projets 
  it has to be done this way.  */

  const reqImageURL = async (userId) => {
    const bucket = import.meta.env.VITE_SUPABASE_STORAGE
    const path = `${userId}/avatar`
    const defaultImg = "../../assets/default_avatar.png"

    try {
    const {data, error} = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60)
    if(error || !data){
      console.log("no image ", error)
      return defaultImg
    }

    //console.log("after createSignedUrl ", data)
    return data.signedUrl
    } catch (error){
      //console.log("Error in image request catch ", error)
      return defaultImg
    }
  }

  //upload image - find all with userId, delete all others, save one, then upload the link to profile - return link to profile image to function

  const uploadImage = async (userId, file) => {
    
   //find previous image and delete
    const bucket = import.meta.env.VITE_SUPABASE_STORAGE
    const path = `${userId}/avatar`
    console.log(" in upload userId", userId)
    console.log(" in upload file", file)

    const {error} = await supabase.storage.from(bucket).remove([path])

    //upload new image

    const {error: uploadError} = await supabase.storage.from(bucket)
    .upload(path, file, {upsert: true, contentType: file.type})
    if(uploadError) {
      console.log("upload Error .upload ", uploadError)
    }

    //reqest Image url
    const {data: urlData, error: reqError} = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60)

    if(reqError) {
      console.log("Request Error ", reqError)

    }

    console.log("urlData", urlData.signedUrl)
    return urlData.signedUrl

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
    <AuthContext.Provider value={{session, uploadImage, reqImageURL, loading, signUpUser, signInUser, signOut, resetState, username, userData, getUserData, addUsername, validate, resetPassword}}>{children}</AuthContext.Provider>
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