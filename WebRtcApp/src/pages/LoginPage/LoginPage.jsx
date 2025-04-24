import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import Login from "../../component/Login";
import { useNavigate } from "react-router-dom";

const LoginPage =(props)=>{
        const navigate = useNavigate();
        const [location, setLocation]= useState(null);
        const hanldeLogin = ()=>{
                navigate("/Map")
        }

        useEffect(()=>{
                navigator.geolocation.getCurrentPosition(
                        (position)=>{
                                const { latitude, longitude } = position.coords;
                                console.log(longitude, latitude);
                                setLocation({ latitude, longitude });             
                        },
                        (error)=>{
                          console.log(error);
                        }
                        )
                
        },[]);
        return(
            <div className="l_page_main_container">
                   <div className="l_page_box">
                    <Login logoClass = "logo"
                           loginInputClass ="l_page_input" 
                           loginButtonClass ="l_page_login_button" clickHandle = {hanldeLogin} />      
                   </div>
            </div>
        );

}

export default  LoginPage;