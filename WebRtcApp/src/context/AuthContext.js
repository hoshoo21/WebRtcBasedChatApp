
import createDataContext from "./createDataContext";


const AuthReducer = (state,action)=>{
    switch (action.type){

        case "Set_Name":
            return {...state, name : action.payload};
        case "Check_Valid_User":
            return {...state, isValidUserName :action.payload};

        case "Set_User_Location":
            return {...state, userLocation :action.payload};

        default:
            return state;
    }
};


const setName = (dispatch)=>{
    return (name)=>{
        dispatch({type:"Set_Name", payload : name});
    }
}

const isValidUser=(dispatch)=>{
    return (name)=>{
        const isValidName = name.length > 0  && name.length <15 && !name.include(' ');  
        dispatch({type : "Check_Valid_User", payload : isValidName});
    }
}

const setUserLocation =(dispatch)=>{
    return (userLocation)=>{
        dispatch({type :"Set_User_Location", payload:userLocation});
    }    
}
export const {Provider,Context} = createDataContext (AuthReducer,
     {setName, isValidUser, setUserLocation }, 
     {name : '' , isValidUserName:true,  userLocation: null}
);