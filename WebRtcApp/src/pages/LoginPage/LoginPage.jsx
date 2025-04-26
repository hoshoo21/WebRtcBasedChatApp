import React, { useContext, useEffect } from "react";
import "./LoginPage.css";
import Login from "../../component/Login";
import { useNavigate } from "react-router-dom";
import {Context as AuthContext} from '../../context/AuthContext';
const LoginPage =(props)=>{
        const navigate = useNavigate();
        const {state, setUserLocation } = useContext(AuthContext);
        const hanldeLogin = ()=>{
                navigate("/Map")
        }
        useEffect(()=>{
                navigator.geolocation.getCurrentPosition(
                        (position)=>{
                                const { latitude, longitude } = position.coords;
                                console.log(longitude, latitude);
                                setUserLocation({ latitude, longitude });             
                        },
                        (error)=>{
                          console.log(error);
                          setUserLocation(null);
                         }
                        )
                
        },[]);
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