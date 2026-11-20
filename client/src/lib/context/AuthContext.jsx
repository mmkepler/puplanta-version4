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
  const signInUser = async (email, password, token, hp) => {
    console.log("calling signin in auth")
    
   try{
    const response = await axios.post("http://localhost:7005/api/signin", {email, password, token, hp})
    console.log("in signin auth : ", response.data)
    if(response.data.success === true){
      console.log("sign in response : ", response.data)
      const session = response.data.data.session
      const { error } = await supabase.auth.setSession({access_token: session.access_token, refresh_token: session.refresh_token})
      if(error){
        console.log("Error setting session :", error)
        return {success: false, data: error}
      }
      setSession(session)
    }

    return response.data;
   }catch(err){
    return {success: false, data: err}
   }
  }

  

  //Sign up w/email & password
  const signUpUser = async (email, password, username, token, hp) => {
    setUsername(username)

    try{
      const response = await axios.post("http://localhost:7005/api/signup", {email, password, username, token, hp})
      console.log(response.data)
      if(response.data.success === true){
        return {success: true, data: response.data.data}
      }
      return {success: false, data: response.data.data}
    }catch(err){
      return {success: false, data: err}
    }
   
  }
  

  //Sign out
  const signOut = async () => {
    const {data :{session}} = await supabase.auth.getSession();
    if(!session){
      
    }
    const { error } = await supabase.auth.signOut()
    if(error){
      console.log("sign out error ", error)
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
    
    const response = await axios.post("http://localhost:7005/api/reqimageurl", {path: path})

    if(response.data.success){
      return response.data.data.signedUrl
    } else {
      return defaultImg
    }
    
  }



  //upload image - find all with userId, delete all others, save one, then upload the link to profile - return link to profile image to function

  const uploadImage = async (userId, file) => {
    const bucket = import.meta.env.VITE_SUPABASE_STORAGE;
    const path = `${userId}/avatar`;

    const formData = new FormData()
    formData.append("file", file)
    formData.append("bucket", bucket)
    formData.append("path", path)
    formData.append("userId", userId)

    if (!userId || !file) {
      //need to return an error to account page
      return {success: false, data: "No file or no userId"}
    }

    try{
    const response = await axios.post("http://localhost:7005/api/uploadimg", formData)
    //console.log("upload image response : ", response.data)
    return response.data
    } catch(err){
      console.log("catch err uploadImg : ", err)
    }
  };


  //delete user
  const deleteUser = async(userId) => {
    const response = axios.post("http://localhost:7005/api/deleteuser", {id: userId})
    // if image deletion doesn't work, return a 
    if(response.data.success === false){
      return response.data
    }
  }

  //change Password - after the email has sent for the redirect
  const changePass = async(pass, oldpass, token) => {
    //console.log("session : ", session.access_token)
    //console.log("in change pass : ", pass, userId, token)
  
    if(!pass || !oldpass || !token){
      return {success: false, data: "missing user id or pass"};
    };

    
    try{
      const {data, error} = await supabase.auth.getSession();

      if(error || !data.session?.access_token){
        return {success: false, data: error || "missing session data"};
      };

      

    const response = await axios.post("http://localhost:7005/api/changepass", {pass, oldpass, token, session: data.session.access_token})
    return response.data;
    
    }catch(err){
      return {success: false, data: err};
    };
    

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

    const resetPassword = async (email, token) => {
      
      try{
        const response = await axios.post("http://localhost:7005/api/resetpass", {email, token})
        return response.data
      }catch(err){
        return {success: false, data: err}
      }
      
    }



    const validate = async ({type, token}) => {
        const {data, error} = await supabase.auth.verifyOtp({type, token})
        if(error){
          console.log("error in reset pass : ", error)
          return {success: false, data}
        }
        return {success: true, data}
    }

  return (
    <AuthContext.Provider value={{session, uploadImage, reqImageURL, loading, signUpUser, signInUser, signOut, resetState, username, userData, getUserData, validate, changePass, resetPassword, deleteUser}}>{children}</AuthContext.Provider>
  )
}

export const userAuth = () => {
  return useContext(AuthContext)
}


/*
const resetPassword = async (email, token) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email,{ redirectTo: "http://localhost:5173/validate"})
      if(error){
        //console.log("error in resetPassword in auth ", error)
        return  {success: false, error}
      }
      return {success: true, data}
    }
*/