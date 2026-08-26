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

    //Thanks to geeks for geeks for this regex . https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

    if(regex.test(email))
    {
      setMessage("Please enter an email")
      return
    }

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
        { isDisabled === false && <div>
          <div className="inputs">
            <input name="email" type="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)} value={email} required/>
          </div>
          <br/>
          <button type="submit" disabled={isDisabled}>Submit</button>
        </div>}
      </form>
    </div>
  )
}
