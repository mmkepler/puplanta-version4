import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet"

import { Link } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import "../styles/maps.css"
import icon from "../assets/images/marker-icon.png"
import iconShadow from "../assets/images/marker-shadow.png";


export default function Map(props) {
  return (
    <div id="map">
      <MapContainer id="map-container" center={[33.83911, -84.383283]} zoom={9} scrollWheelZoom={false} loadingControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />{props.data.map((el) => <Marker position={el.position} key={el.id}>
          <Popup>
            <ul className="pins">
              <li className="pin-title">{el.title}</li>
              <li>{el.address.substring(0, el.address.indexOf(",") + 1)}</li>
              <li>{el.address.substring(el.address.indexOf(",") + 2)}</li>
              <li>
                <Link to={`/${el.type}/${el.id}`} state={{data: el}}>Vote on this park</Link>
              </li>
            </ul>
          </Popup>
        </Marker>)}
      </MapContainer>
    </div>
  )
}
