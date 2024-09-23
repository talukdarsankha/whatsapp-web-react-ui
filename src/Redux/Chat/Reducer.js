

const initialValue = {
   createdChat:null,
   createdGroup:null,
   reqUserAllChat:[]
}

export const ChatReducer = (state=initialValue, {type,payload})=>{
     if(type==="CREATE_CHAT"){
      console.log("chat created :");
      console.log(payload);
       return ({...state,createdChat:payload});
       
     } else if(type==="CREATE_GROUP_CHAT"){
            console.log("CREATE_GROUP_CHAT is");
            console.log(payload);
        return ({...state,createdGroup:payload});
      } else if(type==="GET_REQ_USER_CHATS"){
           console.log(payload);
        return ({...state,reqUserAllChat:payload});
      }else{
        return state;
     }
}