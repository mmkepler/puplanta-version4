import React from 'react'
import { userAuth } from './context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const {session} = userAuth()
  
  return (
    <div>{session ? <>{children}</> : <Navigate to="/signin"/>}</div>
  )
}
