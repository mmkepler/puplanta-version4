import React from 'react'
import { useState, useEffect } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/account.css"


export default function Account() {
  const {session, signOut, username, userData, getUserData, addUsername} = userAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(undefined)
  const userId = session?.user?.id;

  useEffect(() => {
    getUserData(userId)
  }, [])

  if(username){
    //console.log("inside user name")
    addUsername(userId, username)
  }

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
        <p>Hello {userData[0]?.username}</p>
        <p><Link to="/password-change">Change password?</Link></p>
        <p onClick={(e) => handleSignOut(e)}>Sign out</p>
      </div>
    </div>
  )
}

