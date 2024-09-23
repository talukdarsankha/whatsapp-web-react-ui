import React, { useState } from "react";
import StatusCard from "./StatusCard";
import "../../WebkitScrollBar/WebkitScrollBar.css";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import StatusViewer from "./StatusViewer";
import { BsArrowLeft } from "react-icons/bs";

function Status() {
  const navigate = useNavigate();

  const [showStory,setShowStory] = useState(false);

  const handleStoryFalse = () => {
    setShowStory(false);
    navigate(-1);
  }

  const handleStatusCard = ()=>{
    setShowStory(true);
    navigate("/status/1")
    console.log("handleStatuscard")
  }



  return (
    <div className="relative h-[100vh] w-[100vw]">
      <div className="absolute top-0 w-full py-12 -z-10 bg-[#00a884]"></div>

      <div className="relative">
        <div className="flex items-center px-[14vw] py-[7vh]">
          {/* left part */}
          <div className="h-[85vh] bg-[#1e262c] w-[50%] lg:w-[30%] px-5">
            <div className="my-3 h-[13%] flex items-center space-x-3">
              
              <BsArrowLeft className="text-2xl cursor-pointer text-white" onClick={()=>navigate("/")}/>
               
               <div onClick={handleStatusCard}>
                 <StatusCard />
               </div>
               
            </div>
            <hr />
            <div className="h-[77%] overflow-y-scroll scrollbar-hide">
              {[1, 1, 1, 11, 1, 1, 1].map(() => (
                <div onClick={()=>handleStatusCard()}>
                  <StatusCard  />
                </div>
              ))}
            </div>
          </div>

          {/* right part */}
            {showStory && <div className="relative flex items-center justify-center h-[85vh]  w-[50%] lg:w-[70%] bg-[#0b141a]">
                    <AiOutlineClose
                    onClick={handleStoryFalse}
                    className="cursor-pointer absolute top-7 right-10 text-xl text-white"
                    />
                    
                <StatusViewer/>
              
          </div> }

          { !showStory && <div className="relative h-[85vh]  w-[50%] lg:w-[70%] bg-[#0b141a]">
                    <AiOutlineClose
                    onClick={handleStoryFalse}
                    className="cursor-pointer absolute top-7 right-10 text-xl text-white"
                    />
                             
          </div> }

          
        </div>
      </div>
    </div>
  );
}

export default Status;
