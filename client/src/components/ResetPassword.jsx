import React from 'react'
import { useState } from 'react'
import supabase from '../lib/supabase'
import { userAuth } from '../lib/context/AuthContext'

export default function ResetPassword() {
  const [message, setMessage] = useState(undefined)
  const [email, setEmail] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const {resetPassword} = userAuth()

    

  const resetRequest = async (e, email) => {
    e.preventDefault()
    const res = await resetPassword(email)
      if(res.success){
        setMessage("Request sent. Please check your email.")
        setEmail("")
        setIsDisabled(true)
      }else {
      setMessage("There was an error submitting this request")
      setEmail("")
      setIsDisabled(true)
      }
  }
  
  return (
    <div className="form">
      <h1>Reset Password</h1>
      <p>{message ? message : ""}</p>
      <form onSubmit={(e) => resetRequest(e, email)}>
        <div className="inputs">
          { isDisabled === false && <input type="email" placeholder="Your email address" onChange={e => setEmail(e.target.value)} value={email}/>}
        </div>
        <br/>
        <button type="submit" disabled={isDisabled}>Submit</button>
      </form>
    </div>
  )
}
