import React,{FC} from 'react'
import { MainNav } from '@/src/utils/user/navigations'
import Link from 'next/link'


const Header:FC = () => {
  return (
    <>
      {
        MainNav.map((item) => {
          return(
            <Link href={item.url}>{item.title}</Link>
          )
        })
      }
    </>
  )
}

export default Header