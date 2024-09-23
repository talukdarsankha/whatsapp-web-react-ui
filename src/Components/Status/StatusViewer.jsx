import React, { useEffect, useState } from 'react'
import { Stories } from './DummyStories';
import ProgressBar from './ProgressBar';




function StatusViewer() {

const [currentindex, setCurrentindex] = useState(0);
const [activeIndex, setActiveIndex] = useState(0);

const handleNextStory = ()=>{
    if(currentindex<Stories?.length-1){
        setCurrentindex(currentindex+1);
        setActiveIndex(activeIndex+1);
    }else{
        setCurrentindex(0);
        setActiveIndex(0);
    }
}

useEffect(()=>{
    const intervalId  = setInterval(() => {
        handleNextStory();
    }, 2000);

    return ()=>clearInterval(intervalId);
},[currentindex])

  return (
    <div className='relative flex justify-center items-center h-[90%] w-[80%] border-red-700 bg-white'>
           <div className='h-full w-full flex items-center justify-center'>
               <div className='flex items-center absolute top-0 left-0 w-full'>
               {Stories?.map((items,i)=>(<ProgressBar key={i} index={i} activeIndex={activeIndex} duration={2000}/>))}
               </div>

               <div className='h-[100%] w-full'>
                  <img className='h-full w-full' src={Stories?.[currentindex].image} alt="" />
               </div>
            </div>    
    </div>
  )
}

export default StatusViewer
