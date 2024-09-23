

import React from 'react'

function ChatCard({name, image}) {
  return (
    <div className='flex items-center p-2 cursor-pointer border-b-2 '>
      {/* https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600
      https://images.stockcake.com/public/d/4/b/d4bea39e-5c9e-4bb6-b8d8-230477617bbe_large/colorful-spring-bouquet-stockcake.jpg */}
     
     <div className='w-20%]'>
         <img className='h-14 w-14 rounded-full' src={image} alt="" />
     </div>

     <div className='pl-5 w-[80%]'>
         <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>{name}</p>
            <p className='text-sm opacity-65'>timestamp</p>
         </div>

         <div className='flex justify-between items-center'>
            <p>latest Message...</p>
            <div className='flex items-center'>
                <p className='text-xs text-white py-1 px-2 bg-[#008069] rounded-full'>5</p>
            </div>
         </div>
     </div>
    
    </div>
  )
}

export default ChatCard
