import React from 'react'
import { useState } from 'react'
import { userAuth } from '../lib/context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function SignIn() {
  const [ email, setEmail ] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { session, signInUser } = userAuth()
  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await signInUser(email, password)
      if(res.success) {
        navigate("/account")
      }

    } catch (error) {
      setError(error)
      console.log("error ",error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form">
      <h1>Sign In</h1>
      <h2>Don't have an account? <Link to="/signup">Sign up</Link></h2>
      <p>{error ? error : ""}</p>
      <form onSubmit={(e) => handleSignIn(e, email, password)}>
        <div className="inputs">
        <input type="text" id="email" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
        <br/>
        <input type="password" id="password" value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        </div>
        <br/>
        <button type="submit">Log In</button>
      </form>
      <p><Link to="/reset-password">Forgot Password?</Link></p>
    </div>
  )
}
