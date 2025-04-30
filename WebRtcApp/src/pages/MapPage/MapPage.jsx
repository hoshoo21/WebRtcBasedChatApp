import React, { useContext, useEffect } from "react";
import {Context as MapContext} from '../../context/MapSliceContext';
import {getSocketClient} from '../../connection/SocketConnection';
const MapPage =(props)=>{
    const {state, setOnlineUsers} = useContext(MapContext);
    useEffect(()=>{
        console.log("Socket connected:", getSocketClient().connected);
         getSocketClient().on('online-users', (data)=>{
            console.log( "userdata on map page" + JSON.stringify(data));
            setOnlineUsers(data);
         });
         return () => {
            getSocketClient().off("online-users", ()=>{
                console.log('event detached');
            });
        };
    }, [])
    return (
        <div>
            Map page
        </div>
    )
}


export default MapPage;