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
    <div className="form">
      <h1>Change Password</h1>
      <p>{error}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
         <input type="text" placeholder="new password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
      
    </div>
  )
}
