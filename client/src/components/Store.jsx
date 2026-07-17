import React, { useEffect } from 'react'
import supabase  from "../lib/supabase"
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "../styles/stores.css"
import "../styles/parks.css"
import pawsup from "../assets/paws-up.svg"
import pawsdown from "../assets/paws-down.svg"
import arrow from "../assets/black_arrow.svg"
import Modal from './Modal'
import { userAuth } from "../lib/context/AuthContext"

export default function Store(props) {
  //const {state} = useLocation();
  const [store, setStore] = useState()
  const id = useParams()
  const numId = Number(id.id);
  const [modalOpen, setModalOpen] = useState(false );
  const {session, userData, getUserData} = userAuth()
  const navigate = useNavigate()

  async function getStore() {
    const { data, error } = await supabase.from("stores").select("*").eq("id", numId).single()

    setStore(data)
    //console.log("data ", data)
    //console.log("title ", data.title)
    
    if(error){
      console.log("This is an error", error)
    }
  }

  //check to make sure useEffect only runs once in production
  //supposed to run twice in development

  useEffect(()=> {
    //console.log("useEffect 1st params id ", numId);
    getStore();
  }, [])
  

  const checkSession = (e) => {
    e.preventDefault()
    if(!session){
      navigate("/signin")
    } else {
      setModalOpen(true);
    }
  }
    
    return (
      <div id="park-page">
        <div id="park-info">
          {modalOpen && <Modal onClose={() => setModalOpen(false)} data={{title: store?.title, image: store?.image, storeId: store?.id, storeuuid: store?.uuid, votes: store?.votes, type: "stores"}}/>}
          <div id="park-col">
            <h1>{store?.title}</h1>
            <img id="park-image" src={store?.image} alt={`image of ${store?.title}`} />
            <address id="park-address">
              {store?.address.slice(0, store?.address.indexOf(",") + 1)}
              <br/>
              {store?.address.slice(store?.address.indexOf(",") + 1)}
            </address>
            <div id="park-col-2">
              <a href={store?.website} className="park-outside-links" rel="noopener noreferer" target="_blank">website</a>
              <a href={store?.google} className="park-outside-links" rel="noopener noreferer" target="_blank">directions</a>
            </div>
            <h2 id="ratings">Ratings</h2>
            <div id="votes">
              <div id="upvote">
                <p>paws up {store?.votes.up}</p>
                <button className="paws-up">
                  <img src={pawsup} alt="a paw icon pointing upward for a positive vote"/>
                </button>
              </div>
              <div id="downvote">
              <p>paws down {store?.votes.down}</p>
              <button className="paws-down">
                <img src={pawsdown} alt="a paw icon pointing downward for a negative vote" />
              </button>
              </div>
            </div>
            <button id="park-vote-button" onClick={(e) => checkSession(e)}>Vote on this park</button>
          </div>
        </div>
      </div>
    )
}
