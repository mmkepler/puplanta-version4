import React from 'react'
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../lib/context/AuthContext'
import { Turnstile } from '@marsidev/react-turnstile'



export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)
  const {signUpUser} = userAuth()
  const navigate = useNavigate();
  const turnstileRef = useRef(null)
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = turnstileRef.current?.getResponse()
    console.log("signup token ", token)
    
    const res = await signUpUser(email, password, username, token)

    console.log("sign up res ", res)
      if(res.success){
        setPassword("")
        setEmail("")
        setUsername("")
        turnstileRef.current?.reset()
        navigate("/checkemail")
      } else {
        setError("There was an error signing up. Please try again.")
        setPassword("")
        setEmail("")
        setUsername("")
      }
  }

  const handleCheck = (e) => {
    visible ? setVisible(false) : setVisible(true)
  }
  
  return (
    <div className="form">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <h2>Have an account?<br></br>
        <Link to="/signin" className="switch">Sign In</Link></h2>
        {error && <p role="alert">There was an error signing up, please try again</p>}
        <div className="inputs">
          <label htmlFor="username">User Name</label>  
          <input 
          onChange={e => setUsername(e.target.value)} 
          id="username" 
          type="text" 
          placeholder="username" 
          autoComplete="username" 
          value={username} 
          name="username" 
          required/>
          <label htmlFor="email">Email Address</label>
          <input 
          onChange={e => setEmail(e.target.value)} 
          id="email" 
          type="email" 
          placeholder="email" 
          autoComplete="email" 
          value={email}  
          name="email" 
          required/>
          <label htmlFor="password">Password</label>
          <input 
          onChange={e => setPassword(e.target.value)} 
          type={visible ? "text" : "password"} 
          id="password" placeholder="password" 
          autoComplete="new-password" 
          required 
          name="password" 
          value={password}/>
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
        <button type="submit">Create Account</button>
        <p><Link to="/password-reset">Forgot your password?</Link></p>
        <p><Link to="/privacy">Privacy notice</Link></p>
      </form>
    </div>
  )
}