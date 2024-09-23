

const initialValue = {
    
    newMessage:null,
    allChatMessages:[]
 }
 
 export const MessageReducer = (state=initialValue, {type,payload})=>{
      if(type==="CREATE_MESSAGE"){
            console.log("create message");
            console.log(payload);
        return ({...state,newMessage:payload});
      } else if(type==="GET_ALL_MESSAGE"){

        console.log("allChatMessages is :");
        console.log(payload);

         return ({...state,allChatMessages:payload});
       }else{
         return state;
      }
 }