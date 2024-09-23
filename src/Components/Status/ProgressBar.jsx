

import React, { useEffect, useState } from 'react'

import "./Progress-Bar.css"

function ProgressBar({index, activeIndex, duration}) {

  const isActive = index===activeIndex;
   

    const [progress, setProgress] = useState(0);

    useEffect(()=>{
      const interValId = setInterval(() => {
        setProgress((prev)=>{
          if(prev<100){
            return prev+1;
          }
          clearInterval(interValId);
          return prev;
        })
      }, [duration/100]);
   return ()=> clearInterval(interValId);
    },[isActive, progress]);

    useEffect(()=>{
      setProgress(0);
    },[activeIndex])

  return (
    <div className={`progress-bar-container ${isActive?"active":""}`}>
       <div className={`${isActive?"progress-bar":""}`} style={{width: `${progress}%`}}>

       </div>
    </div>
  )
}

export default ProgressBar


