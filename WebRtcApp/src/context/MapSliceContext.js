import createDataContext from "./createDataContext";
import { getSocketClient} from "../connection/SocketConnection";
const mapReducer = (state,action)=>{

    switch (action.type) {
        case "Set_Location":
            return state;
        case "set_Onineusers":
            return {...state, onLineusers : action.paload};    
        default :
            return state;
    }
}

const setOnlineUsers = (dispatch)=>{
    return (users)=>{

        let clientSocketId= getSocketClient().id;
        let modifiedArr = users.map((user)=> user.id == clientSocketId ? user.myself= true: user); 
        dispatch({type :"set_Onineusers", paload: modifiedArr});
    };
}

const setMyLocation =(dispatch)=>{
    return ()=>{    
        dispatch({type : "Set_Location"});
    };
};

export const {Provider , Context}= createDataContext(mapReducer,
     {setMyLocation, setOnlineUsers },
     {onLineusers : []}
);
