

import React from 'react'

function MessageCard({content,isReqUserMessage}) {
  return (
    <div className={`p-2 rounded-md max-w-[45%] ${!isReqUserMessage?'self-start bg-white' : 'self-end bg-[#c8efc1]'}`}>
      <p>{content}</p>
    </div>
  )
}

export default MessageCard
