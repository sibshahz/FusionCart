"use client"
import React,{FC, useEffect} from 'react'
import { MainNav } from '@/src/utils/user/navigations'
import Link from 'next/link' 
import { usePathname } from 'next/navigation'
import LayoutContainer from '../layout-container/laytout-container.component'
import Image from 'next/image'
import Logo from '../../../../public/imgs/logo.png'
import { Account,Search,Heart,Cart } from '@/src/utils/user/icons/icons'



const Header:FC = () => {
  const pathname = usePathname()
  return (
    <LayoutContainer>
    <div className='flex justify-between flex-wrap items-center min-h-[100px] pt-2 pb-2'>
      <div className='header--logo-container flex items-center'>
        <div className="inline">
          <Image src={Logo.src} width={50} height={32} alt='Furniro Furnitures' />
        </div>
        <h1 className='font-bold text-3xl inline text-black font-heading'>Furniro</h1>
      </div>
      
      <div className='header--nav-container flex flex-wrap gap-16'>
        {

          MainNav.map((item,index) => {
            return(
              <Link
                key={`nav-item-${index}`} 
                href={item.url} 
                className={
                  pathname === item.url ?
                  'bg-gray-2 text-primary font-medium' :
                  'font-medium'}>
                {item.title}
              </Link>
            )
          })
          
        }
      </div>
      
      <div className='header--icons-container flex flex-wrap items-center gap-11'>
        <img  className="inline hover:cursor-pointer" src={Account.src} alt="Account" />
        <img  className="inline hover:cursor-pointer" src={Search.src} alt="Search" />
        <img  className="inline hover:cursor-pointer" src={Heart.src} alt="Heart" />
        <img  className="inline hover:cursor-pointer" src={Cart.src} alt="Cart" />        
      </div>
    </div>
    </LayoutContainer>
  )
}

export default Header