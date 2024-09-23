import { json } from "react-router-dom";
import { BASE_URL } from "../../Config/api";
import { CREATE_CHAT, CREATE_GROUP_CHAT, GET_REQ_USER_CHATS } from "./ACtionType";


export const createChat = (chatData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/api/chats/create/${chatData.userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${chatData.token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            dispatch({ type: CREATE_CHAT, payload: data });
        } else {
            console.log("Failed to create chat:", res.status);
        }

    } catch (error) {
        console.log("Error in createChat:", error);
    }
};




export const createGroupChat =(chatData)=> async (dispatch)=>{
    try {
     const res = await fetch(`${BASE_URL}/api/chats/group`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             "Authorization": `Bearer ${chatData.token}`
         },
         body:JSON.stringify(chatData.data)
     });
 
     if(res.ok){
        const  resData = await res.json();
         dispatch({type:CREATE_GROUP_CHAT,payload:resData})
     }
 
    } catch (error) {
      console.log(error);
    }
 }



export const getReqUserAllChats =(chatData)=> async (dispatch)=>{
    try {
     const res = await fetch(`${BASE_URL}/api/chats/user`,{
         method:"GET",
         headers:{
             "Content-Type":"application/json",
             "Authorization": `Bearer ${chatData.token}`
         }
     });
 
     if(res.ok){
        const allChats = await res.json();
         dispatch({type:GET_REQ_USER_CHATS,payload:allChats})
     }
 
    } catch (error) {
      console.log(error);
    }
 }