import { reqUser, signin, updateUser } from "./Action";



 const initialValue = {
    signup:null,
    signin:null,
    reqUser:null,
    searchUsers:[],
    updateUser:null
 }

 export const authReducer =(state=initialValue,{type,payload})=> {
    if(type==="REGISTER"){
       return {...state,signup:payload}
    }else if(type==="SIGNIN"){
        return {...state,signin:payload}
    }else if(type==="REQUSER"){
      return {...state,reqUser:payload}
     }else if(type==="SEARCH_USER"){

       console.log("Search User ");
       console.log(payload);
       
      return {...state,searchUsers:payload}
     }else if(type==="UPDATE_USER"){
      console.log("Update User payload is");
      console.log(payload);
      
     return {...state,updateUser:payload}
    }else{
        return state
    }
 }
