import Link from 'next/link'
import React from 'react'

type Props = {}

const CartDialog = (props: Props) => {
  return (
    <div className='flex flex-col min-w-[417px] p-0'>
      <div className='cart-header w-full text-left leading-normal py-6 px-6 border-b border-gray'>
        <h3 className="cart-heading text-black text-2xl font-semibold leading-normal">Shopping Cart</h3>
      </div>
      <div className='cart-content'></div>
      <div className='cart-footer w-full border-t border-gray p-6 flex flex-row gap-3 justify-start'>

        <Link href="/shop/cart" className='text-xs font-normal leading-normal block border border-black rounded-full py-2 px-8'><span>Cart</span></Link>
        <Link href="/shop/checkout" className='text-xs font-normal leading-normal block border border-black rounded-full py-2 px-8'><span>Checkout</span></Link>
      </div>
    </div>
  )
}

export default CartDialog