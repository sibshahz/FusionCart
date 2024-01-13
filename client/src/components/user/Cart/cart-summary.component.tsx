import { useAppSelector } from '@/src/redux/client-hooks'
import { RootState } from '@/src/redux/client-store'
import Link from 'next/link'
import React from 'react'

type Props = {}

const CartSummary = (props: Props) => {
  const subTotal=useAppSelector((state:RootState) => state.cart.subTotal);
  const total=subTotal;
  return (
    <div className='flex flex-col gap-14 bg-light-pink px-20 pt-4 pb-20 justify-center text-center max-w-max lg:max-w-full'>
      <div className="summary-title text-black font-poppins text-3xl font-semibold leading-normal">Cart Totals</div>
      <div className="cart-pricing flex flex-col gap-8">
        <div className="sub-total flex flex-row w-full justify-between items-center">
          <span className='text-black font-poppins text-base font-medium leading-normal'>Subtotal: </span> 
          <span className='text-gray-5 font-poppins text-base font-medium leading-normal'>Rs. {subTotal}</span>
        </div>
        <div className="total flex flex-row w-full justify-between items-center">
          <span className='text-black font-poppins text-base font-medium leading-normal'>Total:</span> 
          <span className='text-golden font-poppins text-xl font-medium leading-normal'>Rs. {total}</span>
        </div>
      </div>
      <div className="cart-action">
        <Link href="/shop/checkout" 
          className='text-xl font-normal leading-normal block border border-black rounded-2xl py-2 px-8 text-center'>
            <span>Checkout</span>
        </Link>
      </div>
    </div>
  )
}

export default CartSummary