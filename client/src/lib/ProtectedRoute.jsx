import React from 'react'
import { userAuth } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const {session, loading} = userAuth()

  console.log("ProtectedRoute", { loading, session })

  if(loading) return null
  
  return (
    session ? children : <Navigate to="/signin" replace />

  )
}
