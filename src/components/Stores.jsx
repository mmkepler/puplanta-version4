import supabase from "../lib/supabase";
import { useEffect, useState, } from "react";
import Map from "./Map";
import  "../styles/stores.css"
import { Link } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    getStores();
  }, []);

  async function getStores() {
    const { data } = await supabase.from("stores").select();
    setStores(data);
    
  }
  
  return (
    <div id="stores">
      <Map data={[]}></Map>
      <div>
        <ul>
          {stores.map((el) => 
          <li key={el.id}>
            <p>{el.brand}</p>
            <p>{el.address}</p>
            <Link to={"/stores/" + el.id}>Visit Store's page</Link>
          </li>
          )}
        </ul>
      </div>
      </div>
  )
}
