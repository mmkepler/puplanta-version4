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
    <div id="form">
      <h1>Create an account</h1>
      <form onSubmit={handleSubmit}>
        <h2>Already have an account? <Link to="/signin">Sign In</Link></h2>
        
        <div className="inputs">
        <input onChange={e => setUsername(e.target.value)} type="text" placeholder="username"/>
        <br/>
        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="email"/>
        <br/>
        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="password"/>
        </div>
        <br/>

        <button type="submit" disabled={loading}>submit</button>
        <p><Link to="/reset-password">Forgot your password?</Link></p>
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