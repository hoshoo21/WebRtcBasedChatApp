import React from 'react'
import CloseIcon from '../resources/images/close-icon.svg';
const ChatBoxLabel = ({username})=>{
    return <p className='chatbox_nav_bar_label'>  {username} </p>
}

const CloseButton=({socketId})=>{
    return <div className='chatbox_close_icon_container'> 
        <img className='chatbox_close_icon_img' src={CloseIcon} alt={socketId} />
    </div>
}
const NavBar = (props) => {
  return (
    <div className='chatbox_nav_bar_container'>
        <ChatBoxLabel username={props.username} />
        <CloseButton socketId={props.socketId} />
    </div>
  )
}

export default NavBar