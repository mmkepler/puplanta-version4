import React from 'react'
import { useState } from 'react'
import supabase from '../lib/supabase'

export default function ResetPassword() {
  const [error, setError] = useState(undefined)
  const [email, setEmail] = useState("")

  const request = async (email) => {
    await supabase.auth.resetPasswordForEmail(email, {redirectTo: "localhost:5173/reset-password"})
    if(error){
      setError(error)
    }
  }

  const resetRequest = (e, email) => {
    e.preventDefault()
    request(email)
    
  }
  
  return (
    <div>
      <h1>Reset Password</h1>
      <p>{error}</p>
      <form onSubmit={(e) => resetRequest(e, email)}>
        <input type="email" placeholder="Your email address" onChange={e => setEmail(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}
