import { type } from "@testing-library/user-event/dist/type";
import { BASE_URL } from "../../Config/api"
import { REGISTER, REQUSER, SEARCH_USER, SIGNIN, UPDATE_USER } from "./ActionType";


export const register =(data)=> async (dispatch)=>{
    try {
       const res = await fetch(`${BASE_URL}/auth/signup`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
        })

        const resData = await res.json();
        if(resData.jwt){
            localStorage.setItem("jwt",resData.jwt);
            console.log("register");
            dispatch({type:REGISTER,payload:resData});
        }
       
         
    } catch (error) {
        console.log(error);
    }
}

export const signin =(data)=> async (dispatch)=>{
    try {
       const res = await fetch(`${BASE_URL}/auth/signin`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
        })

        const resData = await res.json();
        console.log("signin");

        if(resData.jwt){
            localStorage.setItem("jwt",resData.jwt);
        }
        dispatch({type:SIGNIN,payload:resData});
         
    } catch (error) {
        console.log(error);
    }
}


export const logout =()=> (dispatch)=>{
    localStorage.removeItem("jwt");
    dispatch({type:REQUSER, payload:null});
    console.log("logout user");
}

export const reqUser =(token)=> async (dispatch)=>{
    try {
       const res = await fetch(`${BASE_URL}/api/users/profile`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
             "Authorization" : `Bearer ${token}`
        }
        })

        const resData = await res.json();
        console.log("Get reqUser Profile");
        dispatch({type:REQUSER,payload:resData});
         
    } catch (error) {
        console.log(error);
    }
}

export const searchUser =(data)=> async (dispatch)=>{
    try {
       const res = await fetch(`${BASE_URL}/api/users/search?query=${data.searchQuery}`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json",
             "Authorization" : `Bearer ${data.token}`
        }
        })

        const resData = await res.json();
        console.log("Search User Profile query is :"+data.searchQuery);
        dispatch({type:SEARCH_USER,payload:resData});
         
    } catch (error) {
        console.log(error);
    }
}


export const updateUser =(data)=> async (dispatch)=>{
    try {
       const res = await fetch(`${BASE_URL}/api/users/update`,{
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
             "Authorization" : `Bearer ${data.token}`
        },
        body:JSON.stringify(data.data)
        })

        const resData = await res.json();
        console.log("Update User Profile");
        dispatch({type:UPDATE_USER,payload:resData});
         
    } catch (error) {
        console.log(error);
    }
}



