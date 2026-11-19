import React from 'react'
import { useState, useRef } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'

export default function ResetPassword() {
  const [message, setMessage] = useState(undefined);
  const [email, setEmail] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {resetPassword} = userAuth();
  const turnstileRef = useRef(null);
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    

  const resetRequest = async (e, email) => {
    e.preventDefault();
    setSubmitting(true);

    const token = turnstileRef.current?.getResponse() //could I just use turnstileToken
    //Thanks to geeks for geeks for this regex . https://www.geeksforgeeks.org/javascript/how-to-validate-email-address-using-regexp-in-javascript/
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/

    if(regex.test(email)){
      setMessage("Please enter an email")
      return
    }

    console.log("token : ", token)

    console.log("email : ", email)
    const res = await resetPassword(email, token)
    console.log("res : ", res)
      if(res.success){
        setMessage("Request sent. Please check your email.")
        setEmail("")
        setSubmitting(true)
        return
      }else {
      setMessage("There was an error submitting this request")
      setEmail("")
      setSubmitting(true)
      }
      setSubmitting(false);
  }
  
  return (
    <div className="form">
      <h1>Reset Password</h1>
      <p>{message ? message : ""}</p>
      <form onSubmit={(e) => resetRequest(e, email)}>
        { submitting === false && <div>
          <div className="inputs">
            <input name="email" type="email" placeholder="you@example.com" onChange={e => setEmail(e.target.value)} value={email} required/>
          </div>
          <Turnstile
            ref={turnstileRef}
            siteKey={sitekey}
            className="turnstile"
            onSuccess={setTurnstileToken}
            onError={() => setTurnstileToken("")}
            onErrorCapture={() => setTurnstileToken("")}
          />
          <button type="submit" disabled={!turnstileToken || submitting}>Submit</button>
        </div>}
      </form>
    </div>
  )
}
