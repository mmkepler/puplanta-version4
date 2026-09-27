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
  const { session, signUpUser} = userAuth()
  const navigate = useNavigate();
  const turnstileRef = useRef(null)
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = turnstileRef.current?.getResponse()
    console.log("signup token ", token)
    
    const res = await signUpUser(email, password, username, token)
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
        <h2>Already have an account? <Link to="/signin">Sign In</Link></h2>
        {error ? error : ""}
        <div className="inputs">
        <input onChange={e => setUsername(e.target.value)} type="text" placeholder="username" autoComplete="username" value={username} required/>
        <br/>
        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="email" autoComplete="email" value={email} required/>
        <br/>
        <input onChange={e => setPassword(e.target.value)} type={visible ? "text" : "password"} placeholder="password" autoComplete="password" required value={password}/>
        <br></br>
        <input type="checkbox" id="visibility" className="visibility"  name="visibility" onClick={handleCheck}/>
        
        <label htmlFor="visibility">
        show password
        </label>
        </div>
        <br/>
        <Turnstile
        ref={turnstileRef}
        siteKey={sitekey}
      />
        <button type="submit">Submit</button>
        <p><Link to="/password-reset">Forgot your password?</Link></p>
        <p><Link to="/privacy">Privacy notice</Link></p>
        {error && <p>There was an error signing up, please try again</p>}
      </form>
    </div>
  )
}