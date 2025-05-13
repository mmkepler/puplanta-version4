
import supabase  from "../lib/supabase"
import { useEffect, useRef, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import  "../styles/parks.css"
import { Link } from "react-router-dom";


export default function Parks() {
  const [parks, setParks] = useState([])
  const navigate = useNavigate();
  let popupData = [];
  let parkIndex;
  //console.log("parks", parks)

  useEffect(() => {
    getParks();
    
  }, []);

  async function getParks() {
    const { data } = await supabase.from("parks").select();
    setParks(data);
  }

  //console.log("parks in parks", parks)


   if(parks.length > 0){
    parks.forEach((item) => {
      let temp = {};
      let tempIndex = item.address.indexOf(",") + 1;
      //console.log("index ", tempIndex);
      temp.position = [item.lat, item.lng];
      temp.title = item.title;
      temp.image = item.image;
      temp.address = item.address;
      temp.address1 = item.address.slice(0,tempIndex);
      temp.address2 = item.address.slice(tempIndex);
      temp.id = item.id;
      temp.votes = item.votes
      popupData.push(temp);
    });
   }

    return (
      <div id="parks">
       <Map data={popupData}></Map>

        <div id="parks-list">
          <ul id="parks-ul">
            { 

            
            
            parks.map((el) => 
            <li key={el.id} className="park-li">
              <p className="park-name">🐾{el.title}</p>
              <p>{el.address.slice(0, el.address.indexOf(",") + 1)}</p>
              <p>{el.address.slice(el.address.indexOf(",") + 1)}</p>
              <p>
                <Link to={ `/parks/${el.id}`} state={{data: el}}>Visit Park's Page to vote!</Link>
              </p>
            </li>)}
          </ul>
        </div>
      </div>
    );
}



/*
return (
      <div id="parks">
        <Map data={popupData}></Map>

       <div id="parks-list">
       <ul id="parks-ul">
         {parks.map((el) => 
         <li key={el.id} className="park-li">
           <p className="park-name">🐾{el.title}</p>
           <p>{el.address.slice(0, el.address.indexOf(",") + 1)}</p>
           <p>{el.address.slice(el.address.indexOf(",") + 1)}</p>
           <p>
             <Link to={ `/parks/${el.id}`} state={{data: el}}>Visit Park's Page to vote!</Link>
           </p>
         </li>)}
       </ul>
     </div>
   </div>
 );

*/
