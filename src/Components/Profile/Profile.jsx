

import React, { useEffect, useState } from 'react'
import { BiCheck } from 'react-icons/bi';
import { BsArrowLeft, BsCheck, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom'
import { uploadToCloudinary } from '../../Config/Utill';
import { useDispatch, useSelector } from 'react-redux';
import { reqUser, updateUser } from '../../Redux/Auth/Action';
import { CircularProgress } from '@mui/material';

function Profile({handlenavigateBack}) {
    const navigate = useNavigate();
    
    const [flag, setFlag] = useState(false);
    const handleUpdateName = ()=>{
        setFlag(false);
        dispatch(updateUser({data:{full_name:username},token}))
    }

    const [profileUrl, setProfileUrl] = useState("");

    const [isLoadUpdateProfileUrl, setIsLoadUpdateProfileUrl] = useState(false);

    const [username, setUsername] = useState("");
    

    const {auth} = useSelector(store=>store);
    const dispatch = useDispatch();

    const token = localStorage.getItem("jwt");

    // const handleImageUpload = async (file)=>{

    //     setIsLoadUpdateProfileUrl(true);

    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append("upload_preset","whatsapp-clone-one");
    //   formData.append("cloud_name","doa7jctor");

    //   await fetch("https://api.cloudinary.com/v1_1/doa7jctor/image/upload",{
    //     method:"POST",
    //     body:formData
    //   }).then((res)=>res.json())
    //   .then((resData)=>{
    //     setProfileUrl(resData.url.toString())
    //     setIsLoadUpdateProfileUrl(false);

    //         dispatch(updateUser({data:{profile_picture:profileUrl} , token}))
        
    //         console.log(" profileUrl");
    //         console.log(profileUrl)
        

    //   })
      
    // }

    const handleImageUpload=async(file)=>{
      setIsLoadUpdateProfileUrl(true);     
      const data=new FormData();
      data.append("file",file);
      data.append('cloud_name',"doa7jctor");
      data.append('upload_preset',"whatsapp-clone-one");
  
      await fetch("https://api.cloudinary.com/v1_1/doa7jctor/image/upload",{
        method:"POST",
        body:data       
      }).then((res)=>res.json())
      .then((data)=>{
        setProfileUrl(data.url.toString());
        dispatch(updateUser({
          token,
          data:{
          profile_picture:data.url.toString()
          }
        }));
      })
      setIsLoadUpdateProfileUrl(false);
      setProfileUrl("");
    }

    useEffect(()=>{
      if(token){
        dispatch(reqUser(token));
      }
    },[auth.updateUser])


  return (
    <div >
      <div className='flex items-center space-x-6 text-white bg-[#008069] pt-7 px-8 pb-4'>
         <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handlenavigateBack}/>
         <p className='cursor-pointer font-bold text-xl'>Profile</p>
      </div>
        
        <div className='relative flex flex-col justify-center items-center my-7'>
            <label htmlFor="profileImgInput">
                <img className='rounded-full w-[13vw] h-[13vw] cursor-pointer' 
                src={ profileUrl || auth.reqUser?.profile_picture  || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt='profile-image' />
            </label>

            {isLoadUpdateProfileUrl && <CircularProgress className='absolute top-[5rem] left-[45%]' color='inherit' />}

            <input
            accept='image/*'
            onChange={(e)=>{
                handleImageUpload(e.target.files[0]);
            }}
             type="file"
              id='profileImgInput'
               hidden />
        </div>

        <div className='px-5 py-1 mr-1 bg-white'>
            <p className='my-3 opacity-60'>Your name</p>
            {!flag && <div className='w-full flex items-center  justify-between'>
                <p className='py-3'>{auth.reqUser.full_name}</p>
                <BsPencil onClick={()=>setFlag(true)} className='cursor-pointer'/>
            </div>}

            {flag && <div className='flex justify-between items-end my-3'>
                <input
                onChange={(e)=>setUsername(e.target.value)}
                className='w-[85%] outline-none border-b-2 border-blue-600 p-2' 
                 type="text" placeholder='Write your name'
                 value={username}
                 />

                 <BiCheck 
                 onClick={()=>handleUpdateName()}
                 className='cursor-pointer text-3xl'/>
            </div>}
        </div>

        <div className='px-4 '>
            <p className='py-10'>This is not your username, this name will be visible to your WhatsApp contact.</p>
        </div>

       
    </div>
  )
}

export default Profile
