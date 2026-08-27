import React from 'react'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import supabase from '../lib/supabase'
import { userAuth } from '../lib/context/AuthContext'

export default function PasswordChange() {
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(true)
  const {signOut} = userAuth()

  const changePW = async (pw) => {
    let pwTrimmed = pw.trim()

    if(!pwTrimmed || pwTrimmed.length < 6){
      setMessage("Password must be at least 6 characters")
      setPassword("")
      return
    }
    
    setMessage("")

    try{
      
      const {error} = await supabase.auth.updateUser({password: pwTrimmed})

      if(error){
        console.log("Error updating password ", error)
        setMessage(`There was an error updating password</br>Please try again.`)
        return
      }
      setVisible(false)
      setMessage("Password has been changed. You will be signed out")
      setTimeout(() => {signOut()},3000)
      return

    }catch(error){
      console.log("Error updating password ", error)
        setMessage(`There was an error updating password</br>Please try again`)
        return
    }
      
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    changePW(password)
    setMessage("")
    setPassword("")
  }

  return (
    <div className="form">
      <h1>Change Password</h1>
      <p>{message}</p>
      {visible && 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
         <input type="password" placeholder="new password" name="password" onChange={e => setPassword(e.target.value)} required/>
        </div>
        <div className="rules">
          <p>Password must be at least 6 characters</p>
          <p>You cannot submit the same password</p>
          <p>Please limit retries as the free tier of the auth platform can only send 2 emails per hour</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      }
    </div>
  )
}
