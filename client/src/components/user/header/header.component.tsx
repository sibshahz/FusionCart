"use client"
import React,{FC, useEffect} from 'react'
import { MainNav } from '@/src/utils/user/navigations'
import Link from 'next/link' 
import { usePathname } from 'next/navigation'



const Header:FC = () => {
  const pathname = usePathname()
  return (
    <>
      {
        MainNav.map((item) => {
          return(
            <Link 
              href={item.url} 
              className={
                pathname === item.url ?
                'mr-2 bg-slate-500' :
                'mr-2'}>
              {item.title}
            </Link>
          )
        })
      }
    </>
  )
}

export default Header