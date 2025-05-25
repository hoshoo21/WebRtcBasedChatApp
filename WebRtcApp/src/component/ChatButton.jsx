import React from 'react'
import chatIcon from '../resources/images/chat-icon.svg';
const ChatButton = (props) => {
  const handleChat = ()=>{

  }
  return (
        <img src={chatIcon} className='map_page_card_img' onClick={handleChat} />
    )
}

export default ChatButton