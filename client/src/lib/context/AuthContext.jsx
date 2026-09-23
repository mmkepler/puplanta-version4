import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import supabase from '../supabase'
import defaultImg from "../../assets/default_avatar.png"
import axios from "axios"

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")  //just username might not need 
  const [userData, setUserData] = useState("") //profile data
  const [imageUrl, setImageUrl] = useState(null)
  const [userDataError, setUserDataError] = useState("")


  //get user Profile data - whole row
  const getUserData = async (id) => {
    setUserDataError("")

   try {
    const response = await axios.post("http://localhost:7005/api/getuserdata", {id: id})
    //console.log("server response: ", response.data)
    if(response.data.success === true){
      setUserData(response.data.data)
      setUsername(response.data.data.username)
    } else {
      setUserDataError(response.data.data)
    }
   } catch(error){
      setUserDataError("There was an error retrieving your user data. Please refresh")
   }
    
  }

  
  //Sign in w/password
  const signInUser = async (email, password) => {
    /*try {
      const { data, error } = await supabase.auth.signInWithPassword({email, password})
      if(error){
        //console.log("sign in error ", error)
        return {success: false, error}
      }
      //console.log("sign in success ", data)
      return {success: true, data}
    } catch(error){
      //console.error("sign in error catch ", error )
    }*/
   try{
    const response = await axios.post("http://localhost:7005/api/signin", {email: email, password: password})
    //console.log("in signin auth : ", response.data)
    if(response.data.success === true){
      setSession(response.data.data.session)
    }
    return response.data
    
   }catch(err){
    return {success: false, data: err}
   }
  }


  //Sign up w/email & password
  const signUpUser = async (email, password, username) => {
    setUsername(username)

    try{
      const response = await axios.post("http://localhost:7005/api/signup", {email, password, username})
      console.log(response.data)
      if(response.data.success === true){
        return response.data
      }
    }catch(err){
      return {success: false, data: err}
    }
   
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

    if(!session?.access_token){
      return defaultImg
    }

    try{
      const response = await axios.post("http://localhost:7005/api/getimageurl", {id: userId}, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        }
      })
      

      if(response.success === false){
        return defaultImg
      }
      
      return response.data.data.signedUrl

    }catch(err){
      console.log("reqimageurl in catch ", err)
      return defaultImg
    }
    /*
    try{ 
      //search for the file first to avoid errors in the console
      const {data: entry, error: searchError} = await supabase.storage.from(bucket).list(userId, {search: "avatar"})

      //It doesn't exist in storage
      if(searchError){
        return defaultImg
      }

      
      //No data was returned
      if(!entry || entry.length === 0){
        return defaultImg
      }

      //if all goes well above, request the url
      const {data, error:SignedUrlError} = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
      
      //if the request fails return the default
      if(SignedUrlError || !data?.signedUrl){
        return defaultImg
      }

      return data.signedUrl

    }catch(error){
      console.log("error reqImageUrl ", error)
      return defaultImg
    }*/

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
      const { data, error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo: "https://www.puplanta.com/validate"})
      if(error){
        console.log("error in resetPassword in auth ", error)
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
    <AuthContext.Provider value={{session, uploadImage, reqImageURL, loading, signUpUser, signInUser, signOut, resetState, username, userData, getUserData, validate, resetPassword}}>{children}</AuthContext.Provider>
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