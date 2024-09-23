

import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { green } from "@mui/material/colors";
import { useDispatch, useSelector } from 'react-redux';
import { register, reqUser } from '../../Redux/Auth/Action';


function Register() {

  const navigate = useNavigate();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [inputData, setInputData] = useState({
    email:"", password:"",full_name:""
  });

  const dispatch = useDispatch();
 const {auth} = useSelector(store=>store);

  const handeSubmit= (e)=>{
    e.preventDefault();
    setOpenSnackBar(true);
    console.log(inputData);

    dispatch(register(inputData));

  }

  const handleChange =(e)=>{
    const {name,value} = e.target;
    setInputData((inputData)=>({...inputData,[name]:value}));
  }

  const handleSnackBarClose = ()=>{
    setOpenSnackBar(false);
  }

  const token = localStorage.getItem("jwt");
  
  useEffect(()=>{
     if(token){
      dispatch(reqUser(token));  // we can't navigate profile page if we found jwt because anyhow jwt can stored any random srtring which is not a proper jwt
     }
  },[token]);

  useEffect(()=>{
  if(auth.reqUser?.email){   // that's why this check is mandatory       
    navigate("/");  
  }
  },[auth.reqUser])


  return (
    <div className="bg-[#d6d6d7]">
    {/* <div className="bg-green-400 pt-14 pb-5 px-7 w-full relative top-0"></div> */}

   <div className="flex justify-center items-center h-screen">
    
     <div className="bg-white w-[30%] p-10 shadow-md rounded-md">
       <form onSubmit={handeSubmit} className="space-y-5">

        <div>
           <p className="pb-2">Full Name</p>
           <input
             name='full_name'
             onChange={handleChange}
             type="text"
             value={inputData.fullname}
             className="border border-green-300 outline-green-600  w-full rounded-md p-2"

             placeholder="enter fullname"
           />
        </div>


         <div>
           <p className="pb-2">Email ID</p>
           <input
             name='email'
             onChange={handleChange}
             type="email"
             value={inputData.email}
             className="border border-green-300 outline-green-600 w-full rounded-md p-2"
             placeholder="enter email address"
           />
         </div>

         <div>
           <p className="pb-2">Password</p>
           <input
             name="password"
             onChange={handleChange}
             type="password"
             value={inputData.password}
             className="border border-green-300 outline-green-600 w-full rounded-md p-2"
             placeholder="enter password"
           />
         </div>

         <Button type="submit" sx={{bgcolor:green[600]}} className="w-full" variant="contained" >Register</Button>
       </form>

       <div className="flex space-x-3 items-center mt-5">
         <p>Already have an account? </p>
         <Button variant="text" onClick={()=>navigate("/signin")}>sign up</Button>
       </div>
     </div>
   </div>


   
   <Snackbar
    open={openSnackBar}
    autoHideDuration={6000}
    onClose={handleSnackBarClose}
    >
      <Alert onClose={handleSnackBarClose} severity="success" sx={{width:"100%"}}>
      {inputData.full_name} your account created successfully
      </Alert>
    </Snackbar>

 </div>
  )
}

export default Register
