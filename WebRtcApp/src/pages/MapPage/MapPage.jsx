import React, { useContext, useEffect, useRef } from "react";
import  { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {Context as MapContext} from '../../context/MapSliceContext';
import {getSocketClient} from '../../connection/SocketConnection';
import useSocketEvents from "../../hooks/useSocketEvents";
import {Context as AuthContext} from '../../context/AuthContext';
import { getDistanceInKm } from "../../helper/locationHelper";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import  './MapPage.css';


function FitBounds({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
}

const FitToLine = ({ points }) => {
  const map = useMap();
 
  useEffect(() => {
    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, points]);
  return null;
};
const MapWithLineAndDistance = (souceCord, destinationCoord) => {
  const distance = getDistanceInKm(souceCord.latitude, souceCord.longitue, destinationCoord.latitude, destinationCoord.longitude).toFixed(2);

  const midPoint = [
    (souceCord.latitude + destinationCoord.latitude) / 2,
    (souceCord.longitude + destinationCoord.longitude) / 2,
  ];

}
const MapPage =(props)=>{
  
   const {state, setOnlineUsers, setSelectedPoints,removeUser} = useContext(MapContext);
    const mylocation = state.onLineusers.find ((user)=> user.myself=== true);
    const otherUsers =  state.onLineusers.filter ((user)=> user.myself === undefined);
    const myPos = [mylocation.data.latitude, mylocation.data.longitude];
    const otherPositions = otherUsers
      .filter(user => user.data?.latitude && user.data?.longitude)
      .map(user => [user.data.latitude, user.data.longitude]);
    const allPositions = [myPos, ...otherPositions];
    const icon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    });
    
    useEffect(()=>{
       const handlePopupClick =(e)=>{
        console.log("clicked target", e.target);
        console.log(e.target.dataset.id);
        const pos = otherUsers.find ((position)=> position.id === e.target.dataset.id);
        if (state.selectedPoints.length ==2 && pos){
          setSelectedPoints([pos]);
        }
        else if (!state.selectedPoints.some(p => p[0] === pos[0] && p[1] === pos[1])) {
          if (pos)
            setSelectedPoints([pos.data.latitude, pos.data.longitude]);
        }

        
      };
       const observer = new MutationObserver(()=>{
        const popupEls  = document.querySelectorAll(".popup-content");
          popupEls.forEach((el)=>{
            if (!el.dataset.bound){
                el.addEventListener('click', handlePopupClick);
                el.dataset.bound = true;
            }
          })
       });
       observer.observe(document.body, { childList: true, subtree: true });
       return ()=>{
        const popupEls  = document.querySelectorAll(".popup-content");
        popupEls.forEach((el)=>{
          el.removeEventListener('click',handlePopupClick);
        });
        observer.disconnect();  
       }

      },[]);
   
     
    
    let line = null;
    let midPoint = null;
    let distance = null;
    
    if (state.selectedPoints.length === 2) {
      line = state.selectedPoints;
      midPoint = [
        (line[0].latitude + line[1].latitude) / 2,
        (line[0].longitude + line[1].longitue) / 2,
      ];
      distance = getDistanceInKm(line[0].latitude, line[0].longitude, line[1].latitude, line[1].longitude).toFixed(2);
    }
    

    useSocketEvents({ onLogin: false,userData:{} , setOnlineUsers, removeUser });
    const defaultProps =[

               mylocation? mylocation.data.latitude:0 , 
               mylocation? mylocation.data.longitude:0,
               mylocation? mylocation.username : "" 
              ];
   
              
    if (!mylocation || !mylocation.data) {
        return <div>Loading map...</div>;
      }
      return (
        <div className="map_page_container">
        
            <MapContainer center={defaultProps} zoom={13} style={{ height: '100%', width: '100%' }}>
            <FitBounds locations={allPositions} />
             <TileLayer
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             />
         <Marker position={defaultProps}>
          <Popup >
            <div className="popup-content">
               Name : {defaultProps[2]} <br/>
               Latitude: {defaultProps[0].toFixed(5)} <br/>
               Longitude: {defaultProps[1].toFixed(5)}
            </div>
             
          </Popup>
        </Marker>
        {console.log (otherUsers)}
        {Array.isArray(otherUsers) && otherUsers.map((user, index) => (
          user?.data?.latitude && user?.data?.longitude ? (
            <Marker
              key={user.id || `user-${index}`}
              position={[user.data.latitude, user.data.longitude]}
              icon = {icon}
              
            >
              <Popup>
                <div className="popup-content"
                   style={{ cursor: "pointer", color: "blue" }}
                   
                   data-id={user.id}
                   data-name = {user.username}
                   > 
                 
                     <p
                     className="map_page_card_label" style ={{fontSize:16}}>Name : {user.username} <br/> </p>
                    Latitude: {user.data.latitude.toFixed(5)} <br />
                    Longitude: {user.data.longitude.toFixed(5)}
                </div>
               
              </Popup>
            </Marker>
          ) : null
        ))}
        {line && (
        <>
          <Polyline positions={line} color="blue" />
          <Marker position={midPoint}>
            <Popup>Distance: {distance} km</Popup>
          </Marker>
            <FitToLine  points={line} />
          </>
        )}
      </MapContainer>
        </div>
    )
}


export default MapPage;
