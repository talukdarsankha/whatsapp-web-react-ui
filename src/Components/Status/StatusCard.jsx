

import React from 'react'

function StatusCard() {
  return (
    <div className='flex items-center p-3 cursor-pointer'>
       <div>
         <img className='w-7 h-7 lg:w-10 lg:h-10 rounded-full' src="https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600" alt="status user" />
       </div>

        <div className='ml-3 text-white'>
            <p>username</p>
        </div>
    </div>
  )
}

export default StatusCard


