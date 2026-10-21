import React from 'react'
import { useState, useRef } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Turnstile } from '@marsidev/react-turnstile'

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hp, setHp] = useState("")
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const turnstileRef = useRef(null)
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  const { signInUser } = userAuth()
  const navigate = useNavigate()
  let buttonText

  //handle text on the submit button during turnstile loading, normal use and submitting
  if(!turnstileToken){
    buttonText = "Loading ..."
  } else if(submitting){
    buttonText = "Submitting..."
  } else{
    buttonText = "Log In"
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSubmitting(true)

    const token = turnstileRef.current?.getResponse()  
    const res = await signInUser(email, password, token, hp)
    
    console.log("sign in res ", res)
      if(res?.success === true) {
        turnstileRef.current?.reset()
        setEmail("")
        setPassword("")
        setHp("")
        navigate("/account")
        //setSubmitting(false)
        setTurnstileToken(false)
        return;
      } else {
        turnstileRef.current?.reset()
        //generic error message to not give any data away
        setError("There was an error signing in. Please try again.")
        setEmail("")
        setPassword("")
        setHp("")
        setTurnstileToken("")
        //setSubmitting(false)
      }
      setSubmitting(false)
  }

  const handleCheck = (e) => {
    visible ? setVisible(false) : setVisible(true)
  }

  return (
    <div className="form">
      <h1>Sign In</h1>
      <h2>Don't have an account?<br></br>
      <Link to="/signup">Sign up</Link></h2>
      <p>{error ? error : ""}</p>
      <form onSubmit={(e) => handleSignIn(e, email, password)}>
        <div className="inputs">
          <div hidden aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              />
          </div>
          <label htmlFor="email">Email Address</label>
          <input 
          type="email" 
          id="email" 
          value={email} 
          name="email"
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="email" 
          required 
          autoComplete="email"/>
          <label htmlFor="password">Password</label>
          <input 
          type={visible ? "text" : "password"} 
          id="password" 
          value={password} 
          name="password"
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="password" 
          required 
          autoComplete="password"/>
          </div>
          <div className="vis-div">
          <input 
          type="checkbox" 
          id="visibility" 
          name="visibility" 
          className="visibility" 
          checked={visible} 
          onChange={handleCheck}/>
          </div>
          <label htmlFor="visibility">
          show password
          </label>
          <Turnstile
            ref={turnstileRef}
            siteKey={sitekey}
            className="turnstile"
            onSuccess={setTurnstileToken}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
          <button type="submit" disabled={!turnstileToken || submitting} >{buttonText}</button>
        </form>
      <p className="forgot">
        <Link to="/password-reset">Forgot Password?</Link>
      </p>
    </div>
  )
}