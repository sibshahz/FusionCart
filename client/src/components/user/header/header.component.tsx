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
import ClientPortal from '../portal/portal.component'
import SigninForm from '../signin/signin-form.component'
import { RootState } from '@/src/redux/client-store'
import { useAppSelector } from '@/src/redux/hooks'
import UserDetails from '../user-details/user-details.component'
import CartDialog from '../CartDialog/cart-dialog.component'



const Header:FC = () => {
  const pathname = usePathname()
  const userDetails=useAppSelector((state:RootState) => state.user)
  const isLoggedIn=userDetails.isLoggedIn;
  const [mobileMenu,setMobileMenu] = useState(false);
  const [display,setDisplay] = useState(false);
  const menuBurger = useRef(null);

  const toggleMenu=(): void =>{
    setMobileMenu(!mobileMenu)
  }
  return (
    <>
    <LayoutContainer bg='inherit'>
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
        
        <div className="dropdown md:dropdown-end">
        <img tabIndex={0} role='button' className="inline hover:cursor-pointer" src={Account.src} alt="Account" />
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 w-max">
            <li className='pb-8 bg-white'>{isLoggedIn ? <UserDetails /> : <SigninForm />}</li>
          </ul>
        </div>

        <div className="dropdown md:dropdown-end">
        <img tabIndex={0} role='button' className="inline hover:cursor-pointer" src={Search.src} alt="Search" />
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
        <img tabIndex={0} role='button' className="inline hover:cursor-pointer" src={Heart.src} alt="Heart" />
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>

        <div className="dropdown dropdown-left">
          <img tabIndex={0} role='button' className="inline hover:cursor-pointer" src={Cart.src} alt="Cart" />
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-max">
            <li className='bg-white'><CartDialog /></li>
          </ul>
        </div>

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
    {/* {
      display && (
        <ClientPortal><div className='w-[418px] min-h-[92%] bg-white h-96 fixed right-0 top-0 z-20' onClick={() => setDisplay(!display)}></div></ClientPortal>
      )
    } */}
    </>
  )
}

export default Header