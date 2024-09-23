import { BASE_URL } from "../../Config/api";
import { CREATE_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";


export const createMessage =(MessageData)=> async (dispatch)=>{
    try {
     const res = await fetch(`${BASE_URL}/api/messages/create`,{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             "Authorization": `Bearer ${MessageData.token}`
         },
         body:JSON.stringify(MessageData.data)
     });
 
     if(res.ok){
        const resData = await res.json();
         dispatch({type:CREATE_MESSAGE,payload:resData})
     }
 
    } catch (error) {
      console.log(error);
    }
 }
 

 export const  getAllMessages =(MessageData)=> async (dispatch)=>{
    try {
     const res = await fetch(`${BASE_URL}/api/messages/chat/${MessageData.chatId}`,{
         method:"GET",
         headers:{
             "Content-Type":"application/json",
             "Authorization": `Bearer ${MessageData.token}`
         }
     });
 
     if(res.ok){
        const resData = await res.json();
         dispatch({type:GET_ALL_MESSAGE,payload:resData})
     }
 
    } catch (error) {
      console.log(error);
    }
 }
 
