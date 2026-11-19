import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { userAuth } from '../lib/context/AuthContext';
import { Turnstile } from '@marsidev/react-turnstile';

export default function PasswordChange() {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [visible, setVisible] = useState(true);

  const [pwvisible, setPwvisible] = useState(false)
  const {signOut, changePass, session} = userAuth()
  const userId = session?.user?.id
  const turnstileRef = useRef(null)
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY
  const navigate = useNavigate()

  const changePW = async (pw) => {
    let pwTrimmed = pw.trim()

    //stop submit if passwords don't match
    if(password !== confirmPassword){
      setMessage("The passwords do not match.")
      setPassword("")
      setConfirmPassword("")
      return
    }

    //stop submit if under 6 characters
    if(!pwTrimmed || pwTrimmed.length < 6){
      setMessage("Password must be at least 6 characters")
      setPassword("")
      setConfirmPassword("")
      return
    }

    if(!turnstileToken){
      setMessage("Turnstil Token needed to submit")
      setPassword("")
      setConfirmPassword("")
      return
    }
    
    setMessage("")

    //issues with session after password change
    const handleSignOut = async () => {
      await signOut();
      navigate("/signin", {replace: true});
    }

    try{

      
      const response = await changePass(pwTrimmed, userId, turnstileToken);

      if(response.success === false){
        console.log("Error updating password ", response.data)
        setMessage(`There was an error updating password</br>Please try again.`)
        return
      }
      setVisible(false)
      setMessage("Password has been changed. You will be signed out")
      setTimeout(() => {
        void handleSignOut();
      }, 3000);
      return

    }catch(error){
      console.log("Error updating password ", error)
        setMessage(`There was an error updating password</br>Please try again`)
        return
    }
      
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    changePW(password, userId, turnstileToken)
    
  }

  const handleCheck = (e) => {
    pwvisible ? setPwvisible(false) : setPwvisible(true)
  }

  return (
    <div className="form">
      <h1>Change Password</h1>
      <p>{message}</p>
      {visible && 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
         <input type={pwvisible ? "text" : "password"} placeholder="new password" name="password" onChange={e => setPassword(e.target.value)} required/>
         <input type={pwvisible ? "text" : "password"} placeholder="confirm password" name="confirmpassword" onChange={e => setConfirmPassword(e.target.value)} required/>
        <div className="vis-div">
          <input 
          type="checkbox" 
          id="visibility" 
          name="visibility" 
          className="visibility" 
          checked={pwvisible} 
          onChange={handleCheck}/>
          
          <label htmlFor="visibility">
          show password
          </label>
          </div>
        </div>
        
         <Turnstile
          ref={turnstileRef}
          siteKey={sitekey}
          className="turnstile"
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken("")}
          onError={() => setTurnstileToken("")}
          onErrorCapture={() => setTurnstileToken("")}
        />
        <button type="submit">Submit</button>
        <div className="rules">
          <p>Password must be at least 6 characters</p>
          <p>You cannot submit the same password</p>
          <p>Please limit retries as the free tier of the auth platform can only send 2 emails per hour</p>
        </div>
      </form>
      }
    </div>
  )
}
