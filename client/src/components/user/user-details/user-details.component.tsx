import { RootState } from '@/src/redux/client-store'
import { setUser } from '@/src/redux/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import Link from 'next/link'
import React from 'react'

type Props = {}

const UserDetails = (props: Props) => {
  const userDetails=useAppSelector((state:RootState) => state.user)
  const dispatch=useAppDispatch();
  return (
    <div className='flex flex-col gap-5 p-6 min-w-[280px]'>
      <div className="avatar">
        <div className="w-24 mask mask-hexagon">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="grid h-max bg-primary place-items-center border-b border-gray-5 pb-2">
          <div className="join-item font-poppins text-xl font-normal leading-6 text-black">{userDetails.firstName+' '+userDetails.lastName}</div>
          <div className="join-item font-poppins text-sm font-normal leading-6 text-black">{userDetails.email}</div>  
        </div> 
        <div className="grid h-max bg-primary place-items-center">
          <Link  className="w-full px-4 py-2 hover:bg-gray-5  border-b border-gray-5 pb-2" href="/settings"><div>Settings</div></Link>
          <Link  className="w-full px-4 py-2 hover:bg-gray-5  border-b border-gray-5 pb-2" href="/orders"><div>Orders</div></Link>
          <Link  className="w-full block px-4 py-2 hover:bg-gray-5  border-b border-gray-5 pb-2" href="/support"><div>Support</div></Link>
        </div>
      </div>
      <button className="join-item btn btn-neutral mb-3" onClick={()=> dispatch(setUser({}))}>Signout</button>

    </div>
  )
}

export default UserDetails