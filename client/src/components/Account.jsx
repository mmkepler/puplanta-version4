import React from 'react'
import { useState, useEffect } from 'react'
import { userAuth } from '../lib/hooks/AuthContext'
import { useNavigate } from 'react-router-dom'



export default function Account() {
  const {session, signOut, username, userData, getUserData, addUsername} = userAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(undefined)
  const userId = session?.user?.id;
 //console.log("username ", username)

useEffect(() => {
  
 getUserData(userId)
 
      
  
 
}, [])

if(username){
  console.log("inside user name")
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

  return (
    <div>
      <h1>Account info</h1>
      <div>
        <p>{error}</p>
        <p>Hello {session?.user?.email}</p>
        <p>{JSON.stringify(userData)}</p>
        <p onClick={(e) => handleSignOut(e)}>Sign out</p>
      </div>
    </div>
  )
}

