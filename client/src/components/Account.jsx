import React from 'react'
import { userAuth } from '../lib/hooks/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Account() {
  const {session, signOut} = userAuth()
  const navigate = useNavigate()
  console.log("session ", session)

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
        <p>Hello {session?.user?.email}</p>
        <p onClick={(e) => signOut(e)}>Sign out</p>
      </div>
    </div>
  )
}

