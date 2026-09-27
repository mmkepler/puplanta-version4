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
  const turnstileRef = useRef(null)
    const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY

  const { signInUser } = userAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();
    const token = turnstileRef.current?.getResponse()
    console.log("signup token ", token)

    const res = await signInUser(email, password, token)
      
    
      if(res?.success === true) {
        turnstileRef.current?.reset()
        setEmail("")
        setPassword()
        navigate("/account")
        return;
      } else {
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
      <h2>Don't have an account? <Link to="/signup">Sign up</Link></h2>
      <p>{error ? error : ""}</p>
      <form onSubmit={(e) => handleSignIn(e, email, password)}>
        <div className="inputs">
        <input type="text" id="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="email" required autoComplete="email"/>
        <br/>
        <input type={visible ? "text" : "password"} id="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="password" required autoComplete="current password"/>
        <br></br>
        <input type="checkbox" className="visibility" id="visibility" name="visibility" onClick={handleCheck}/>
        <label htmlFor="visibility">
        show password
        </label>
        </div>
        <br/>
        <Turnstile
          ref={turnstileRef}
          siteKey={sitekey}
        />
        <button type="submit">Log In</button>
      </form>
      <p><Link to="/password-reset">Forgot Password?</Link></p>
    </div>
  )
}