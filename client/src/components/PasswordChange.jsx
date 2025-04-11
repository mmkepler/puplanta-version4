import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import supabase from '../lib/supabase'


export default function PasswordChange() {
  const [error, setError] = useState(undefined)
  const [password, setPassword] = useState("")

  const changePW = async () => {
    const {error} = await supabase.auth.updateUser({password})
      if(JSON.toString(error)){
        setError(error)
      }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault()
    changePW(password)
    setPassword("")
    console.log("changed");
  }

  return (
    <div>
      <h1>Change Password</h1>
      <p>{error}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="new password" onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
      <p></p>
    </div>
  )
}
