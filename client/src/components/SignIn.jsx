import React from 'react'
import { useState, useRef } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Turnstile } from '@marsidev/react-turnstile'

export default function SignIn() {
  const [ email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const [lock, setLock] = useState(false)
  const turnstileRef = useRef(null)
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  const { signInUser } = userAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();

    const token = turnstileRef.current?.getResponse()
   
    
    const res = await signInUser(email, password, token)

    console.log("sign in res ", res)
      if(res?.success === true) {
        turnstileRef.current?.reset()
        setEmail("")
        setPassword("")
        navigate("/account")
        return;
      } else {
        turnstileRef.current?.reset()
        setError("There was an error signing in. Please try again.")
        setEmail("")
        setPassword("")
      }
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
          />
          <button type="submit" disabled={lock}>Log In</button>
        </form>
      <p><Link to="/password-reset">Forgot Password?</Link></p>
    </div>
  )
}