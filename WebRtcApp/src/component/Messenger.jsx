import React from 'react'
import  './Messenger.css';
import ChatBox from './ChatBox';

const Messenger = (props) =>{
    
    const DUMMY_CHATBOXES = [
    {
        username: "Sinister",
        socketId: 3213123,
        messages: [],
    },
    {
        username: "Test",
        socketId: 3233123,
        messages: [],
    },
    ];
    return (
        <div className='messenger_container' >
            {DUMMY_CHATBOXES.map((cb)=> 
                <ChatBox key={cb.socketId} socketId = {cb.socketId} username = {cb.username} />
            )}
        </div>
    );
    
}
export default Messenger