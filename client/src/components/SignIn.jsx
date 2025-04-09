import React from 'react'
import { useState } from 'react'
import { userAuth } from '../lib/hooks/AuthContext'
import { useNavigate } from 'react-router-dom'

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
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Sign In</h2>
      <p>{error ? error : ""}</p>
      <form onSubmit={(e) => handleSignIn(e, email, password)}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}
