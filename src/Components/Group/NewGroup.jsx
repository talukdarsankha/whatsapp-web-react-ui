

import { Avatar, Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { createGroupChat } from '../../Redux/Chat/Action';

function NewGroup({navigateBackNewGroup, groupMember, closeGroup}) {

    const [isGroupImageUploading, setIsGroupImageUploading] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [groupImage, setGroupImage] = useState("");

    const dispatch = useDispatch();

    const token = localStorage.getItem("jwt");



    const uploadToCloudinary = async (file)=>{
      const formData = new FormData();
      formData.append("file",file);
      formData.append('cloud_name',"doa7jctor");
      formData.append('upload_preset',"whatsapp-clone-one");

      setIsGroupImageUploading(true)

      await fetch("https://api.cloudinary.com/v1_1/doa7jctor/image/upload",{
         method:"POST",
         body:formData
      }).then((res)=>res.json())
      .then((resDAta)=>{
         setGroupImage(resDAta.url.toString());
         setIsGroupImageUploading(false);
         console.log(resDAta.url.toString());
      })
    }
    
    const handleCreateGroup = ()=>{
       let userIds = [];
       for(let user of groupMember){
         userIds.push(user.id);
       }

       const data = {
         userIds,
         chatName:groupName,
         chatImage:groupImage
       }

       const chatData={
         data,
         token         
       }

       dispatch(createGroupChat(chatData));
       closeGroup()

    }
    
  return (
   <div className='w-full h-full'>
       <div className='flex items-center space-x-7 bg-[#008069] text-white pt-14 pb-5 px-5'>
        <BsArrowLeft onClick={navigateBackNewGroup} className='text-2xl font-bold cursor-pointer'/>
        <p className='text-xl font-semibold'>New Group</p>
       </div>

       <div className='flex flex-col justify-center items-center my-8'>
            <label htmlFor="groupimgInput" className='relative'>
               

                <Avatar
                sx={{width:"12rem",height:"12rem"}}
                 className='rounded-full cursor-pointer'
                src={groupImage || "https://www.kindpng.com/picc/m/17-177275_unknown-infobox-image-unknown-team-hd-png-download.png"} />

               {  isGroupImageUploading && <CircularProgress className='absolute top-[5rem] left-[5rem]' />}

            </label>
          

            <input type="file"
                className='hidden'
                id='groupimgInput'
                onChange={(e)=>{
                    console.log("groupimgInput changed");
                    uploadToCloudinary(e.target.files[0]);
                }}
             />

       </div>

       <div className='flex justify-between items-center w-full py-2 px-5'>
          <input type="text"
           className='w-full outline-none border-b-2 border-green-700 p-2 bg-transparent'
           placeholder='Group Name'
           value={groupName}
            
           onChange={(e)=>{
            setGroupName(e.target.value);
           }}
          />
       </div>

       { groupName && <div className='text-center mt-2'>
       <Button onClick={handleCreateGroup}>
         <div className='bg-[#33d273] p-4 rounded-full'>
            <BsArrowRight className='text-2xl font-semibold text-white'/>
         </div>
       </Button>

       </div>}

      
   </div>
  )
}

export default NewGroup
