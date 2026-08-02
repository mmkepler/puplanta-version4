import React, { useEffect } from 'react'
import supabase  from "../lib/supabase"
import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
//import "../styles/stores.css"
import "../styles/parks.css"
import pawsup from "../assets/paws-up.svg"
import pawsdown from "../assets/paws-down.svg"
import arrow from "../assets/black_arrow.svg"
import Modal from './Modal'
import loader from './Loader'
import Error from './Error';
import { userAuth } from "../lib/context/AuthContext"
import Loader from './Loader'

export default function Store(props) {
  //const {state} = useLocation();
  const [store, setStore] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const id = useParams()
  const numId = Number(id.id);
  const [modalOpen, setModalOpen] = useState(false );
  const {session, userData, getUserData} = userAuth()
  const navigate = useNavigate()

  async function getStore() {
    const { data, error } = await supabase.from("stores").select("*").eq("id", numId).single()

    if(!data){
      setLoading(false)
      setError(true)
    }
    setStore(data)
    setLoading(false)
    if(error){
      console.log("This is an error", error)
     
      setLoading(false)
      setError(true)
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
            {modalOpen && <Modal onClose={() => setModalOpen(false)} data={{title: store.title, image: store.image, storeId: store.id, storeuuid: store.uuid, votes: store.votes, type: "stores"}}/>}
              <div id="park-col">
                {error ? <Error/> :
                <div>
                <div className="title-holder">
                  <h1 className="title">{store?.title}</h1>
                </div>
                <div className="image-holder">
                  { loading ? <Loader/> :
                  <img id="park-image" src={store?.image} alt={`image of ${store?.title}`} />
                  }
                </div>
                <div className="address-holder">
                  <address id="park-address">
                    {store?.address.slice(0, store?.address.indexOf(",") + 1)}
                    <br/>
                    {store?.address.slice(store?.address.indexOf(",") + 1)}
                  </address>
                </div>
                </div>
                  }
                  {error ? "" : 
                 <div>
                <div id="park-col-2">
                  <a className="park-outside-links" href={store?.website} rel="noopener noreferer" target="_blank">website</a>
                  <a className="park-outside-links" href={store?.google} rel="noopener noreferer" target="_blank">directions</a>
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
                <button id="park-vote-button" onClick={(e) => checkSession(e)}>Vote on this store</button>
              </div>}
              </div>
            </div>
          </div>
    )
}
