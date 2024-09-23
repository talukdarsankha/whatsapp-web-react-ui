

import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

function SelectMember({handleRemoveMember, member}) {
  return (
    <div className='p-1.5 flex items-center bg-slate-300 rounded-full'>
      <img  className='w-7 h-7 rounded-full'
      src={member.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
      alt="" 
      />

      <p className='px-2'>{member.full_name}</p>
      <AiOutlineClose className='pr-1 cursor-pointer'
      onClick={handleRemoveMember}/>
    </div>
  )
}

export default SelectMember
