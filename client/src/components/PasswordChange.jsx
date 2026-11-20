import React from 'react';
import { useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import { userAuth } from '../lib/context/AuthContext';
import { Turnstile } from '@marsidev/react-turnstile';

export default function PasswordChange() {
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [visible, setVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pwvisible, setPwvisible] = useState(false);
  const {signOut, changePass, session} = userAuth();
  const userId = session?.user?.id;
  const turnstileRef = useRef(null);
  const sitekey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const navigate = useNavigate();

  const changePW = async (password, oldPassword, confirmPassword) => {
    

    //clear message and start submit disabling of button
    setMessage("")
    setSubmitting(true)

    //message added, don't clear 
    //if any inputs are missing
    if(!oldPassword || !password || !confirmPassword){
      setMessage("Missing field");
      setSubmitting(false);
      return;
    }

    if(oldPassword === password){
      setMessage("New Password cannot match old password");
      setSubmitting(false);
      setPassword("");
      setOldPassword("");
      setConfirmPassword("")
      return;
    }

    //don't clear
    //stop submit if passwords don't match, but don't clear
    if(password !== confirmPassword){
      setMessage("The passwords do not match.");
      setSubmitting(false);
      return;
    }

    //stop submit if under 6 characters
    if(password.length < 6){
      setMessage("Password must be at least 6 characters")
      setPassword("");
      setConfirmPassword("");
      setSubmitting(false);
      return;
    }

    if(!turnstileToken){
      setMessage("Turnstile Token needed to submit");
      setPassword("");
      setConfirmPassword("");
      setSubmitting(false);
      return;
    }
    

    //ensure navigation to sign in after password change
    const handleSignOut = async () => {
      await signOut();
      navigate("/signin", {replace: true});
    }

    try{
      
      const response = await changePass(password, oldPassword, turnstileToken);

      if(response.success === false){
        console.log("Error updating password ", response.data);
        setMessage(`There was an error updating password. Please try again.`);
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
        setSubmitting(false);
        resetTurnstile();
        return;
      }
      setVisible(false);
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      setMessage("Password has been changed. You will be signed out");
      setTimeout(() => {
        void handleSignOut();
      }, 3000);
      return;


    }catch(error){
      console.log("Error updating password ", error);
      setMessage(`There was an error updating password. Please try again`);
      setPassword("");
      setOldPassword("");
      setConfirmPassword("");
      resetTurnstile();
      setSubmitting(false);
      return;
    }
      
  }

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
    };

  const handleSubmit = (e) => {
    e.preventDefault()
    changePW(password, oldPassword, confirmPassword);
    
  }

  const handleCheck = (e) => {
    pwvisible ? setPwvisible(false) : setPwvisible(true);
  }

  return (
    <div className="form">
      <h1>Change Password</h1>
      <p>{message}</p>
      {visible && 
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="inputs">
         <input type={pwvisible ? "text" : "password"} placeholder="old password" name="oldpassword" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required/>
         <input type={pwvisible ? "text" : "password"} placeholder="new password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
         <input type={pwvisible ? "text" : "password"} placeholder="confirm password" name="confirmpassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
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
        <button type="submit"  disabled={!turnstileToken || submitting}>Submit</button>
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
