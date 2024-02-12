'use client'
import React from 'react'
import gsap from "gsap"
import { useGSAP } from '@gsap/react';

type Props = {}


const Client_About = (props: Props) => {

const container = React.useRef();
let box=React.useRef()
useGSAP(() => {
  const boxes=gsap.utils.toArray(".box");
  gsap.from(boxes, {opacity: 0, stagger: 1,duration: 0.5, y: 100, ease: "power2.inOut"});

  
   // ✅ safe, wrapped in contextSafe() function and we remove the event listener in the cleanup function below. 👍
},{scope:container});

const handleClick = (event) => {
  const box = event.target;
  const rect = box.getBoundingClientRect();
  gsap.to(box, { duration: 1, x: rect.right + 50, ease: "bounce" });
};


  return (
    <div>
      <div ref={container} className='flex flex-row gap-2'>
        <div className="box bg-golden w-28 h-28" onClick={handleClick}></div>
        <div className="box bg-red-accents w-28 h-28" onClick={handleClick}></div>
        <div className="box bg-green-accents w-28 h-28" onClick={handleClick}></div>
    </div>
    </div>
  )
}

export default Client_About