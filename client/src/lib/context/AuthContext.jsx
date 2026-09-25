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
    
   try{
    const response = await axios.post("http://localhost:7005/api/signin", {email: email, password: password})
    //console.log("in signin auth : ", response.data)
    if(response.data.success === true){
      const session = response.data.data.session
      const { error } = await supabase.auth.setSession({access_token: session.access_token, refresh_token: session.refresh_token})
      if(error){
        console.log("Error setting session :", error)
        return {success: false, data: error}
      }
      setSession(session)
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
    const path = `${userId}/avatar`
    const bucket = import.meta.env.VITE_SUPABASE_STORAGE;

    if(!userId){
      return defaultImg

    
    }
    try{ 
      const {data, error} = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60)

      if(error){
        //console.log("reqimageurl error : ", error)
        return defaultImg
      }
      //console.log("reqImageURL data :", data.signedUrl)
      return data.signedUrl
    }catch(err){
      //console.log("reqimageurl catch error :", err)
      return defaultImg
    }

    
  }



  //upload image - find all with userId, delete all others, save one, then upload the link to profile - return link to profile image to function

  const uploadImage = async (userId, file) => {
    const bucket = import.meta.env.VITE_SUPABASE_STORAGE;
    const path = `${userId}/avatar`;

    if (!userId || !file) {
      return defaultImg;
    }

    const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
      
    });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return defaultImg;
    }

    const {
      data: urlData,
      error: urlError
    } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 60 * 60);

    if (urlError || !urlData?.signedUrl) {
      console.error("Signed URL error:", urlError);
      return defaultImg;
    }

    return urlData.signedUrl;
  };


  const deleteUser = async(userId) => {
    const response = axios.post("http://localhost:7005/api/deleteuser", {id: userId})

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
        //console.log("error in resetPassword in auth ", error)
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
    <AuthContext.Provider value={{session, uploadImage, reqImageURL, loading, signUpUser, signInUser, signOut, resetState, username, userData, getUserData, validate, resetPassword, deleteUser}}>{children}</AuthContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(AuthContext)
}
