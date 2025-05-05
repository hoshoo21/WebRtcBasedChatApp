import React, { useContext, useState, useEffect } from "react";
import "./LoginPage.css";
import Login from "../../component/Login";
import { useNavigate } from "react-router-dom";
import {Context as AuthContext} from '../../context/AuthContext';
import { getFakeLocation } from "./TEMPORARY_LOCATIONS";
import useSocketEvents from "../../hooks/useSocketEvents";
import { connectToSocketServer, proceedWithLogin } from "../../connection/SocketConnection";
import {Context as MapContext} from '../../context/MapSliceContext';
const LoginPage =(props)=>{
        const navigate = useNavigate();
        const {state, setUserLocation } = useContext(AuthContext);
        const { setOnlineUsers, removeUser } = useContext(MapContext);
        const [shouldLogin, setShouldLogin] = useState(false);
        let  coords = {
                latitude:state.userLocation? state.userLocation.position.latitude : 0,
                longitude:state.userLocation?state.userLocation.position.longitude : 0
   
       }
        let dataobj = {
                        username : state.name,
                        coords : coords
                };
        console.log(dataobj);
                
         useSocketEvents({ onLogin: true, userData:dataobj, setOnlineUsers, removeUser });
               
        const hanldeLogin = ()=>{
                setShouldLogin(true);
                navigate("/Map");
        }
        useEffect(()=>{
                setUserLocation(getFakeLocation());
                // navigator.geolocation.getCurrentPosition(
                //         (position)=>{
                //                 const { latitude, longitude } = position.coords;
                //                 console.log(longitude, latitude);
                //                 setUserLocation({ latitude, longitude });             
                //         },
                //         (error)=>{
                //           console.log(error);
                //           setUserLocation(null);
                //          }
                //         )
                
        },[]);
        console.log(state.userLocation);
        useEffect(()=>{
                
                if (state.userLocation){
                        connectToSocketServer();
                }
                        
        },[state.userLocation])
        return(
            <div className="l_page_main_container">
                   <div className="l_page_box">
                    <Login logoClass = "logo"
                           loginInputClass ="l_page_input" 
                           loginButtonClass ="l_page_login_button" 
                           clickHandle = {hanldeLogin}
                           />      
                   </div>
            </div>
        );

}

export default  LoginPage;