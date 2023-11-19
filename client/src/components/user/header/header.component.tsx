"use client"
import React,{FC, useEffect} from 'react'
import { MainNav } from '@/src/utils/user/navigations'
import Link from 'next/link' 
import { usePathname } from 'next/navigation'
import LayoutContainer from '../layout-container/laytout-container.component'
import Image from 'next/image'
import Logo from '../../../../public/imgs/logo.png'



const Header:FC = () => {
  const pathname = usePathname()
  return (
    <LayoutContainer>
    <div className='flex justify-between items-center'>
      <div className='header--logo-container flex items-center'>
        <div className="inline">
          <Image src={Logo.src} width={50} height={32} alt='Furniro Furnitures' />
        </div>
        <h1 className='font-bold text-3xl inline text-primary font-heading'>Furniro</h1>
      </div>
      
      <div className='header--nav-container'>
        {

          MainNav.map((item) => {
            return(
              <Link 
                href={item.url} 
                className={
                  pathname === item.url ?
                  'mr-16 bg-slate-500' :
                  'mr-16'}>
                {item.title}
              </Link>
            )
          })
          
        }
      </div>
      
      <div className='header--icons-container'>
        Icons
      </div>
    </div>
    </LayoutContainer>
  )
}

export default Header