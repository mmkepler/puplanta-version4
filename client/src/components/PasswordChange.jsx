import React from 'react'
import { useState } from 'react'
import supabase from '../lib/supabase'
import { userAuth } from '../lib/context/AuthContext'

export default function PasswordChange() {
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [visible, setVisible] = useState(true)
  const [pwvisible, setPwvisible] = useState(false)
  const {signOut} = userAuth()

  const changePW = async (pw) => {
    let pwTrimmed = pw.trim()

    //stop submit if passwords don't match
    if(password !== confirmPassword){
      setMessage("The passwords do not match.")
      return
    }

    //stop submit if under 6 characters
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

  const handleCheck = (e) => {
    pwvisible ? setPwvisible(false) : setPwvisible(true)
  }

  return (
    <div className="form">
      <h1>Change Password</h1>
      <p>{message}</p>
      {visible && 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
         <input type={pwvisible ? "text" : "password"} placeholder="new password" name="password" onChange={e => setPassword(e.target.value)} required/>
         <input type={pwvisible ? "text" : "password"} placeholder="confirm password" name="confirmpassword" onChange={e => setConfirmPassword(e.target.value)} required/>
        <div className="vis-div">
          <input 
          type="checkbox" 
          id="visibility" 
          name="visibility" 
          className="visibility" 
          checked={pwvisible} 
          onChange={handleCheck}/>
          
          <label htmlFor="visibility">
          show password
          </label>
          </div>
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
