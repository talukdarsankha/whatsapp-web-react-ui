import React, { useEffect, useState } from "react";
import { AiOutlineFileSearch, AiOutlineSearch } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { BsEmojiSmile, BsFilter, BsMicFill, BsThreeDotsVertical } from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import ChatCard from "../ChatCard/ChatCard";

import "../WebkitScrollBar/WebkitScrollBar.css";
import MessageCard from "../MessageCard/MessageCard";
import { ImAttachment } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import { Button, Menu, MenuItem } from "@mui/material";
import GroupCreate from "./Group/GroupCreate";
import { type } from "@testing-library/user-event/dist/type";
import { REQUSER } from "../Redux/Auth/ActionType";
import { useDispatch, useSelector } from "react-redux";
import { logout, searchUser } from "../Redux/Auth/Action";
import { createChat, getReqUserAllChats } from "../Redux/Chat/Action";
import { IoMdSend } from "react-icons/io";
import { createMessage, getAllMessages } from "../Redux/Message/Action";
import SockJS from "sockjs-client";
import { BASE_URL } from "../Config/api";
import { over } from "stompjs";


function HomePage() {

    const [searchQuery, setSearchQuery] = useState("");
    const [currentChat, setcurrentChat] = useState(null);
    const [content, setContent] = useState("");

    const [isProfile, setisProfile] = useState(false);
    const [isShowGroup, setIsShowGroup] = useState(false);

    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const {auth, chat, message} = useSelector(store=>store);
    
    const token = localStorage.getItem("jwt");
    
    const handleSearch = (query)=>{
      setSearchQuery(query);
      const data = {
        searchQuery:query,
        token
      }
      dispatch(searchUser(data));
    }

    const handleCreateChat = (userId)=>{
      // setcurrentChat(true);
      dispatch(createChat({userId,token}));
      setSearchQuery("");
    }

    const handleCreateMessage=()=>{
       dispatch(createMessage({data:{chatId:currentChat?.id,content},token}))
      // console.log("create message");
    }

    const handleProfileNavigate =()=>{
     navigate("/profile")
    console.log("profile");
     setisProfile(true);
    }

    const navigateBackProfile = ()=>{
      setisProfile(false);
      navigate(-1);
      handleClose(); // for close menu tab
    }

      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);

      const handleMenuClick = (e) => {
        setAnchorEl(e.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleCreateGruop=()=>{
      setIsShowGroup(true)
      handleClose() // for close menu tab
      
    }

    const handleBackGroup =()=>{
      setIsShowGroup(false);
    }

    const handleLogOut = ()=> {
      dispatch(logout());
    }

    
    useEffect(()=>{
      if(!auth.reqUser){
        navigate("/signin");
      }
    },[auth.reqUser])
 
    useEffect(()=>{
      if(auth.reqUser){
        dispatch(getReqUserAllChats({token}));
      }
    },[auth.reqUser, chat.createdChat, chat.createdGroup]);


    useEffect(()=>{
       if(currentChat?.id){
          dispatch(getAllMessages({chatId:currentChat?.id, token}))
       }
    },[currentChat, message.newMessage]);



    const handleCurrentChat = (item)=>{
      setcurrentChat(item);
    }


    const [stompClient, setStompClient] = useState();

    const [isConnect,setIsConnect] = useState(false);

    const connect =()=>{
      const sock = new SockJS(`${BASE_URL}/ws`);
      const temp = over(sock);
      setStompClient(temp);

      const headers = {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN":getCookie("XSRF-TOKEN")
      }

      temp.connect(headers,onConnect,onError);
    }
    

    function getCookie(name){
      const value =`; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if(parts.length===2){
        return parts.pop().split(";").shift();
      } 
    }

    const onError = (error)=>{
      console.log("no error ",error);
    }

    const onConnect=()=>{
      setIsConnect(true);
    }

    const [messages, setMessages] = useState([]);

    useEffect(()=>{
      if(message.newMessage && stompClient){
         setMessages([...messages, message.newMessage]);
         stompClient?.send("/app/message",{},JSON.stringify(message.newMessage));

      }
    },[message.newMessage])

    const onMessageReceive =(payload)=>{
      console.log("receive message ",JSON.parse(payload.body));

      const receiveMessage = JSON.parse(payload.body);
      setMessages([...messages,receiveMessage]);
    }

    useEffect(()=>{
      if(isConnect && stompClient && auth.reqUser && currentChat){
        const subscription = stompClient.subscribe("/group/"+currentChat.id+toString, onMessageReceive);

        return ()=>{
          subscription.unsubscribe();
        }
      }
    })

    useEffect(()=>{
      setMessages(message.allChatMessages);
    },[message.allChatMessages])


    useEffect(()=>{
      connect();
      console.log("single time run useffect")
    },[])

  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] absolute top-0 -z-10 w-full"></div>

      <div className="absolute top-6 left-6 right-6 flex bg-[#f0f2f5] h-[96vh]">
        <div className="left bg-[#e8e9ec] w-[30%] h-full border-l-2">
          
          {  isProfile?  <div className="w-full h-full">
                <Profile handlenavigateBack={navigateBackProfile} />
            </div> : isShowGroup ? <GroupCreate handleCloseGroup ={handleBackGroup}/>  

             :<div className="w-full h-full">

            <div className="">
              <div className=" flex justify-between items-center p-3 cursor-pointer">
                <div className="space-x-3 flex items-center">
                  <div onClick={()=>handleProfileNavigate()}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={auth.reqUser?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                      alt=""
                    />
                  </div>
                  <p>{auth.reqUser?.full_name}</p>
                </div>

                <div className="space-x-3 text-2xl flex cursor-pointer">
                  <TbCircleDashed onClick={()=>navigate("/status")} />
                  <BiCommentDetail />

                  <div>
                    
                      <BsThreeDotsVertical className="text-xl"
                       id="basic-button"
                       aria-controls={open ? 'basic-menu' : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleMenuClick}
                      />
                                      
                      <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleProfileNavigate}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGruop}>Create Group</MenuItem>
                      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                  
                </div>
              </div>

              <div className="relative py-4 px-3 mx-1 flex justify-center items-center bg-white">
                <input
                  onChange={(e)=>{
                    handleSearch(e.target.value);
                  }}
                  value={searchQuery}
                  className="border-none outline-none rounded-md bg-slate-200 w-[90%] px-9 py-2"
                  type="text"
                  placeholder="Search or start new Chat"
                />
                <AiOutlineSearch className="absolute left-5 top-7 " />
                <div>
                  <BsFilter className="ml-4 text-2xl" />
                </div>
              </div>
            </div>

            <div className="overflow-y-scroll scrollbar h-[75%] bg-white">
              {searchQuery && (auth?.searchUsers.length>0 && auth.searchUsers?.map(
                (item) => (
                  <div onClick={()=>handleCreateChat(item.id)} key={item.id}>
                    <ChatCard  name={item.full_name} image={item.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
                    </div>
                )
              ))}

              { !searchQuery &&  chat.reqUserAllChat.length>0  && chat.reqUserAllChat.map(
                (item) => (
                  <div onClick={()=>handleCurrentChat(item)} key={item.id}>

                     {item.group? 
                      <ChatCard name={item.chatName} image={item.chatImage || "https://simpleicon.com/wp-content/uploads/multy-user.png"}/>
                     
                      : 
                       <ChatCard name={auth.reqUser?.id !== item.users[0]?.id ? item.users[0]?.full_name : item.users[1]?.full_name }
                       image={ auth.reqUser?.id !== item.users[0]?.id ? item.users[0]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                         : item.users[1]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
                       />
                     }
                       
                  </div>
                )
              )}

            </div>
          </div>  }
          
          

        </div>
        <div className="right h-full w-[70%] relative" >
           { !currentChat && <div className=" flex flex-col items-center justify-center w-full">
            
               <div className="max-w-[70%] text-center">
                 <img  src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png" alt="" />

                 <p className=" text-4xl text-gray-400">WhatsApp Web</p>
                 <p className="my-9 text-green-600">send and receive message without keeping your photos online. Use WhatsApp on up to 4 Linked devices and 1 phone at the same time.</p>
               </div>
               

            </div>}

            {currentChat && <div className="w-full h-full">

                     
                    {/* header */}
                  <div className="w-full absolute top-0 bg-[#d1d7db]">
                    <div className="flex items-center justify-between">
                        <div className="space-x-4 flex items-center p-3">
                          <img className="w-10 h-10 rounded-full"
                           src={currentChat.group? currentChat.chatImage || "https://simpleicon.com/wp-content/uploads/multy-user.png"
                            :
                            (auth.reqUser?.id !== currentChat.users[0]?.id ? 
                              currentChat.users[0]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            :
                            currentChat.users[1]?.profile_picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                            )

                           } alt="user" />
                          <p>
                            {currentChat.group? currentChat?.chatName
                            :
                             (currentChat.users[0]?.id !== auth.reqUser?.id ?
                              currentChat.users[0]?.full_name : currentChat.users[1]?.full_name)
                            }
                          </p>
                        </div>

                          <div className="flex space-x-3 items-center px-3 text-xl cursor-pointer">
                            <AiOutlineSearch/>
                            <BsThreeDotsVertical/>
                          </div>
                      </div>
                  </div>

                   {/* Message Part */}
                  <div className="px-5 w-full h-full overflow-y-scroll scrollbar ">
                    <div className="space-y-2 px-3 flex flex-col justify-center mt-20 mb-20">
                        {messages.length>0 && messages?.map((item)=><MessageCard key={item.id} content={item?.content} isReqUserMessage={item.user.id === auth.reqUser?.id} />)}

                       
                    </div>
                  </div>

                  {/*footer message section */}

                  <div className="w-full absolute bottom-0 p-3 text-xl bg-[#dbdce2] flex justify-around items-center">
                       <div className="flex items-center  space-x-5">
                          <BsEmojiSmile/>
                          <ImAttachment/>
                       </div> 

                       <input className="py-2 px-4 rounded-md bg-white w-[75%] outline-none border-none" type="text"
                        onChange={(e)=>setContent(e.target.value)}
                        onKeyPress={(e)=>{
                          if(content && e.key==="Enter"){
                            handleCreateMessage();
                            setContent("")
                          }
                        }}
                        value={content}
                        placeholder="Type a message"
                       />

                       <div 
                        onClick={()=>{
                          if(content){
                            handleCreateMessage();
                            setContent("");
                          }
                        }}
                       className="bg-white rounded-full p-2 text-2xl flex justify-center">
                         <IoMdSend/>
                       </div>

                       <BsMicFill/>
                  </div>
              </div>
             
              //  message Section 

            
             }


        </div>
      </div>
    </div>
  );
}

export default HomePage;
