import React from 'react'
import { useState } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function SignIn() {
  const [ email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(false)

  const { signInUser } = userAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();
      const res = await signInUser(email, password)
      if(res.success) {
        navigate("/account")
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
        <button type="submit">Log In</button>
      </form>
      <p><Link to="/password-reset">Forgot Password?</Link></p>
    </div>
  )
}