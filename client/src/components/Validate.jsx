import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userAuth } from '../lib/context/AuthContext'
import "../styles/validate.css"
import supabase from '../lib/supabase'

export default function Validate() {
  const {session} = userAuth()
  const navigate = useNavigate()

  useEffect(() => {
   supabase.auth.onAuthStateChange(async (event, session) => {
     navigate("/password-change")
   })
 }, [])
  
  return (
    <div id="validate">
      <h1>Please wait while we validate your link</h1>
      <div id="validate-wrapper">
      {isLoading && 
        <div id="animation">
          <div className="spinner"></div>
        </div>}
      <Link to="/reset-password">Click here if page does not load</Link>
      </div>
      </div>
  )
}

