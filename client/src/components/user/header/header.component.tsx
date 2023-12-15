"use client"
import React,{FC, useEffect,useState,useRef} from 'react'
import { MainNav } from '@/src/utils/user/navigations'
import Link from 'next/link' 
import { usePathname } from 'next/navigation'
import LayoutContainer from '../layout-container/layout-container.component'
import Image from 'next/image'
import Logo from '../../../../public/imgs/logo.png'
import { Account,Search,Heart,Cart } from '@/src/utils/user/icons/icons'
import { ThreeLineHorizontal,Cross } from 'akar-icons'



const Header:FC = () => {
  const pathname = usePathname()
  const [mobileMenu,setMobileMenu] = useState(false);
  const menuBurger = useRef(null);

  const toggleMenu=(): void =>{
    setMobileMenu(!mobileMenu)
  }
  return (
    <LayoutContainer>
    <div className='flex justify-between
                    flex-wrap items-center
                    flex-col lg:flex-row
                    sm:gap-3 min-h-[100px] 
                    pt-2 pb-2'>
      <div className='header--logo-container flex items-center'>
        <div className="inline">
          <Image src={Logo.src} width={50} height={32} alt='Furniro Furnitures' />
        </div>
        <h1 className='font-bold text-3xl inline text-black font-heading'>Furniro</h1>
      </div>
      
      <div className='header--nav-container flex flex-wrap gap-x-16 gap-y-2 mb-3 md:mb-0 hidden md:flex'>
        {
          MainNav.map((item,index) => {
            return(
              <Link
                key={`nav-item-${index}`} 
                href={item.url} 
                className={
                  pathname === item.url ?
                  'bg-gray-2 text-primary font-medium text-base' :
                  'font-medium text-base'}>
                {item.title}
              </Link>
            )
          })
          
        }
      </div>
      
      <div className='header--icons-container flex flex-wrap items-center gap-x-11'>
        <img className="inline hover:cursor-pointer" src={Account.src} alt="Account" />
        <img className="inline hover:cursor-pointer" src={Search.src} alt="Search" />
        <img className="inline hover:cursor-pointer" src={Heart.src} alt="Heart" />
        <img className="inline hover:cursor-pointer" src={Cart.src} alt="Cart" />        
      </div>
      
      <div className="header--menu-burger 
                      hover:cursor-pointer 
                      bg-white fixed right-6 
                      top-3 md:hidden z-10 
                      shadow-md p-1"
                      onClick={toggleMenu}
                      >
        {
          mobileMenu ? <Cross strokeWidth={1} size={32} /> : <ThreeLineHorizontal strokeWidth={1} size={32} /> 
        
        }
      </div>
      
      {
        mobileMenu && (
          <div className="
            header--mobile-menu 
            fixed md:hidden 
            top-0 flex-col 
            max-w-full flex-1 
            h-full w-full bg-light-bg
            overflow-y-scroll">
          {
            MainNav.map((item,index) => {
              return(
                <div className='mb-2 border-solid border-b-2 
                              border-border-gray max-w-full  
                                w-full text-center'>
                <Link
                  onClick={() => setMobileMenu(!mobileMenu)}
                  key={`nav-item-${index}`} 
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
        )
      }


    </div>
    </LayoutContainer>
  )
}

export default Header