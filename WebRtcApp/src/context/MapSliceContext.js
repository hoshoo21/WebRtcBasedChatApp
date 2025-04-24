import createDataContext from "./createDataContext";

const mapReducer = (state,action)=>{

    switch (action.type) {
        case "Set_Location":
            return state;
        default :
            return state;
    }
}

const setMyLocation =(dispatch)=>{
    return ()=>{
        dispatch({type : "Set_Location"});
    };
};

export const {Provider , Context}= createDataContext(mapReducer,
     {setMyLocation},
     {}
);
