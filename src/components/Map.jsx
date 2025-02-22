import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import "../styles/maps.css"
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


export default function Map(props) {

console.log("props ", props)
 

  return (
    <div id="map">
      <MapContainer id="map-container" center={[33.83911, -84.383283]} zoom={9} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{props.data.map((el) => <Marker position={el.position} key={el.id}>
          <Popup>
            <ul>
              <li>{el.name}</li>
              <li>{el.address}</li>
              <li>
                <Link to="">Vote on this park</Link>
              </li>
            </ul>
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  )
}
