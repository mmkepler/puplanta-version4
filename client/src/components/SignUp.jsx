import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../lib/context/AuthContext'

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const { session, signUpUser} = userAuth()
  const navigate = useNavigate();
  //console.log("session in sign up ", session)

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await signUpUser(email, password, username)
    try{
      if(res.success){
        navigate("/account")
      }
    }catch(error){
      console.log("error in signup page ", error)
      setError(error)
    } finally {
      
      setLoading(false)
    }
  }
  
  return (
    <div>
      <h1>Puplanta</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <p>Already have an account? <Link to="/signin">Sign In</Link></p>
        <input onChange={e => setUsername(e.target.value)} type="text" placeholder="username"/>
        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="email"/>
        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
        <button type="submit" disabled={loading}>submit</button>
        {error && <p>There was an error signing up, please try again</p>}
      </form>
    </div>
  )
}
/*
const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const res = await signUpUser(email, password)
      if(res.success){
        navigate("/account")
      }
    }catch(error){
      console.log("error in signup page ", error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
*/