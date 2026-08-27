import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import drogon from "../assets/drogon_pfp.png"
import "../styles/account.css"
import default_avatar from "../assets/default_avatar.png"
import loading_avatar from "../assets/loading_avatar.png"


export default function Account() {
  const {session, signOut, username, getUserData, addUsername, uploadImage, reqImageURL} = userAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(undefined)
  const [url, setUrl] = useState(null)
  const [img, setImg] = useState()
  const [userData, setUserData] = useState("")
  const userId = session?.user?.id;
  const inputRef = useRef(null)


  useEffect(() => {
    //console.log("in account useEffect ", session)
    let cancelled = false;
    setImg(loading_avatar)
    setUserData(getUserData(userId))
    //console.log("userData", userData)
    async function loadUserData(){
      const userInfo = await getUserData(userId)
      if(!cancelled){
        setUserData(userInfo)
      }
    }
    
    async function loadImage() {
    const imageUrl = await reqImageURL(userId)

    if (!cancelled) {
      setImg(imageUrl)
    }
  }

  if (userId) {
    loadImage();
    loadUserData()
  }

  return () => {
    cancelled = true;
  };
}, [userId]);


  
  



  const openSelector = () => {
    console.log("in open selector")
    inputRef.current?.click()
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview (optional)
    setUrl(URL.createObjectURL(file));
    console.log("url created ", url)

    // upload your file here (optional)
    setImg(uploadImage(userId, file))

  };

  /*if(username){
    //console.log("inside user name")
   
    addUsername(userId, username)
  }*/

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut()
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  //console.log("in account user data ", userData);

  return (
    <div id="account">
      <h1>Account Info</h1>
      <div>
        <p>{error}</p>
        {!error &&
        <div>
          <div className="pfp-holder">
            <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
           <img className="pfp-image" src={img ? img: default_avatar} alt={`profile picture of ${username}`}/> 
            <button className="pfp-btn" onClick={openSelector}>+</button>
          </div>
          <p>Hello {userData?.username}</p>
          <p><Link to="/password-reset">Change password?</Link></p>
          <p><Link to="/privacy">Privacy notice</Link></p>
        </div>} 
          <button onClick={(e) => handleSignOut(e)} className="signout-btn">Sign out</button>
          <p>To delete account please email admin @ puplanta.com<br></br> or <a href="mailto:admin@puplanta.com?subject=delete">click here to open an email</a></p>
          <p className="warning">Please keep in mind this is a portfolio project and not a real webiste.<br></br>Accounts will be deleted every 3 months to save space.</p>

      </div>
    </div>
  )
}

