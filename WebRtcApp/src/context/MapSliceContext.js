import createDataContext from "./createDataContext";
import { getSocketClient} from "../connection/SocketConnection";

const mapReducer = (state,action)=>{

    switch (action.type) {
        case "Set_Location":
            return state;
        case "set_Onineusers":
            console.log('online user payload' + action.payload);
            return {...state, onLineusers : action.payload};    
        case "set_selected_points":
            return {...state ,selectedPoints : action.payload};
        case "remove_user" :
            const userArray = state.onLineusers.filter((user) => user.id !== action.payload );
            return {...state, onLineusers : userArray    };   
        default :
            return state;
    }
}

const setSelectedPoints = (dispatch)=>{
    return (points)=>{
        dispatch({type : "set_selected_points", payload:points });
    }
}

const setOnlineUsers = (dispatch)=>{
    return (users)=>{

        let clientSocketId= getSocketClient().id;
        let modifiedArr = users.map((user)=> user.id == clientSocketId ?{...user,myself:true} : user); 
        dispatch({type :"set_Onineusers", payload: modifiedArr});
    };
}


const removeUser =(dispatch)=>{
    return (userId) =>{
        dispatch ({type:"remove_user", payload : userId});
    }
}

const setMyLocation =(dispatch)=>{
    return ()=>{    
        dispatch({type : "Set_Location"});
    };
};

export const {Provider , Context}= createDataContext(mapReducer,
     {setMyLocation, setOnlineUsers,removeUser, setSelectedPoints },
     {onLineusers : [], selectedPoints:[]}
);
