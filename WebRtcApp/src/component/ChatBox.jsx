import React from 'react'
import NavBar from './NavBar';

const ChatBox = (props) => {
  const {socketId} = props; 
  return (
        <div className='chatbox_container'>
            <NavBar {...props} />            
        </div>
    );
}

export default ChatBox