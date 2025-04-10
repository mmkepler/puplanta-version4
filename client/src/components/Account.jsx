import React from 'react'
import { useState, useEffect } from 'react'
import { userAuth } from '../lib/hooks/AuthContext'
import { useNavigate } from 'react-router-dom'



export default function Account() {
  const {session, signOut, username, userData, getUserData} = userAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(undefined)
  const userId = session?.user?.id;
 

const ud = async () => {
  const res = await getUserData(userId)
  console.log("res ", res)
}

useEffect(() => {
  //ud()
  getUserData(userId)
}, [])

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

