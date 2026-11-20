import React from 'react';
import { userAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const {session, loading} = userAuth();

  if(loading) return <p>Loading</p>
  
  return (
    session ? children : <Navigate to="/signin" replace />
  )
};
