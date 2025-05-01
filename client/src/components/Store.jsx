import React from 'react'
import { useLocation } from 'react-router-dom'
import Modal from './Modal';

export default function Store(props) {
  const {state} = useLocation();
    
    console.log("props ", state);
    return (
      <p>{state.data.id}</p>
    )
}
