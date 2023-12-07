"use client"
import React,{FC, useEffect,useState,useRef} from 'react'
import { D_MainNav } from '@/src/utils/admin/navigations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const D_Sidebar:FC = () => {
  const pathname = usePathname()
  return (
    <div>
      {
        D_MainNav.map((item,index) => {
          return(
            <div 
              key={`d-nav-item-${index}`}
              className='mb-2 border-solid border-b-2 border-border-gray max-w-full w-full text-center'>
            <Link 
              href={item.url} 
              className={
                pathname === item.url ?
                'bg-gray-2 text-primary font-medium text-2xl w-full block p-4' :
                'font-medium text-2xl w-full block p-4'}>
              {item.title}
            </Link>
            </div>
          )
        })
        }
    </div>
  );
}

export default D_Sidebar