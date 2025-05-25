import createDataContext from "./createDataContext";

const msgReducer =(state,action)=>{

    switch(action.type){
       case "remove_chat_box":
            return {
                ...state,
                chatBoxes: state.chatBoxes.filter(
                    (chatbox) => chatbox.id !== action.payload
                )
            };
       case "add_chat_box":
            const chatbox = state.chatBoxes.find(
                (cb) => cb.id === action.payload
            );
            if (chatbox) {
                return state; // no change
            }
            return {
                ...state,
                chatBoxes: [...state.chatBoxes, { id: action.payload }]
            };

       default:
            return state;
    }

}

const removeChatBox = (dispatch) =>{
    return (socketId)=>{
        dispatch({type :"remove_chat_box", payload:socketId});
    }
}
const addChatBox = (dispatch)=>{
    return (socketId)=>{
        dispatch({type : "add_chat_box", payload:socketId });
    }
}
export const {Provider , Context}= createDataContext(
    msgReducer, 
    { addChatBox,removeChatBox},
    {chatBoxes:[]}
);
    