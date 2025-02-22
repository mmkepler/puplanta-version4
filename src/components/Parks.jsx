
import supabase  from "../lib/supabase"
import { useEffect, useRef, useState, } from "react";
import Map from "./Map";
import  "../styles/parks.css"
import { Link } from "react-router-dom";


export default function Parks() {
  const [parks, setParks] = useState([]);
  let popupData = [];
  async function getParks() {
    const { data } = await supabase.from("parks").select();
    
    setParks(data);
  }

  

    useEffect(() => {
      getParks();
    }, []);

    
   const markerData = [33.75, -84.33];
   if(parks.length > 0){
    parks.forEach((item) => {
      let temp = {};
      temp.position = [item.lat, item.lng];
      temp.name = item.title;
      temp.image = item.image;
      temp.address = item.address;
      temp.id = item.id;
      popupData.push(temp);
    });
   }

    return (
      <div id="parks">
        <Map data={popupData}></Map>

        <div id="parks-list">
          <ul>
            {parks.map((el) => 
            <li key={el.id}>
              <p>{el.title}</p>
              <p>{el.address}</p>
              <p>
                <Link to={"/parks/" + el.id}>Visit park's page</Link>
              </p>
            </li>)}
          </ul>
        </div>
      </div>
    );
}
