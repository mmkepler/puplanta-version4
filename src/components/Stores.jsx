import supabase from "../lib/supabase";
import { useEffect, useState, } from "react";
import Map from "./Map";
import  "../styles/stores.css"
import { Link } from "react-router-dom";

export default function Stores() {
  const [stores, setStores] = useState([]);
  let popupData = [];
  
  useEffect(() => {
    getStores();
  }, []);

  async function getStores() {
    const { data } = await supabase.from("stores").select();
    setStores(data);
  }

  if(stores.length > 0){
    stores.forEach((item) => {
      let temp = {};
      temp.position = [item.lat, item.lng];
      temp.name = item.brand;
      temp.image = item.image;
      temp.address = item.address;
      temp.id = item.id;
      popupData.push(temp);
    });
   }
  
  return (
    <div id="stores">
      <Map data={popupData}></Map>
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
