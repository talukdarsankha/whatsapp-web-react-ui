import { Alert, Button, Snackbar } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqUser, signin } from "../../Redux/Auth/Action";




function Login() {

    const [inputData, setInputData] = useState({email:"",password:""});
    const navigate = useNavigate();
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store);

    const handleChange =(e)=>{
        const {name,value} = e.target;
        setInputData((prev)=>({...prev,[name]:value}))
    }

    const handeSubmit =(e)=>{
        e.preventDefault();
        dispatch(signin(inputData));
        setOpenSnackBar(true);
    }

    const handleSnackBarClose = ()=>{
      setOpenSnackBar(false);
    }

    const token = localStorage.getItem("jwt");

    useEffect(()=>{
      if(token){
        dispatch(reqUser(token));
      }
    },[token]);

    useEffect(()=>{
      if(auth.reqUser?.email){
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
              <p className="pb-2">Email ID</p>
              <input
                onChange={handleChange}
                name="email"
                type="text"
                value={inputData.email}
                className="border outline-green-600 border-green-300 w-full rounded-md p-2"
                placeholder="enter email address"
              />
            </div>

            <div>
              <p className="pb-2">Password</p>
              <input
              name="password"
                onChange={handleChange}
                type="text"
                value={inputData.password}
                className="border outline-green-600 border-green-300 w-full rounded-md p-2"
                placeholder="enter password"
              />
            </div>

            <Button type="submit" sx={{bgcolor:green[600]}} className="w-full" variant="contained" >Login</Button>
          </form>

          <div className="flex space-x-3 items-center mt-5">
            <p>Create new account </p>
            <Button variant="text" onClick={()=>navigate("/signup")}>Signup</Button>
          </div>
        </div>
      </div>


      
      <Snackbar
      open={openSnackBar}
      autoHideDuration={6000}
      onClose={handleSnackBarClose}
      >
       <Alert onClose={handleSnackBarClose} severity="success" sx={{width:"100%"}}>
        Account Login Successfull
       </Alert>
      </Snackbar>

    </div>
  );
}

export default Login;
