import Link from 'next/link'
import React from 'react'

type Props = {}

const OrderSummary = (props: Props) => {
  return (
    <div className='flex flex-col gap-y-7'>
      <div className="flex flex-col gap-y-4 pb-10 border-b border-border-gray">
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl font-medium text-black">Product</p>
          <p className="text-2xl font-medium text-black">Subtotal</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-base font-normal text-gray-5">Asgard sofa <span className='font-medium'>x 1</span></p>
          <p className="text-base font-light text-black">Rs. 250.000.00</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-base font-normal text-black">Subtotal</p>
          <p className="text-base font-light text-black">Rs. 250.000.00</p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-base font-normal text-black">Total</p>
          <p className="text-2xl font-bold text-golden">Rs. 250.000.00</p>
        </div>
      </div>

      <p className='text-base font-light text-justify'>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="#" className="font-semibold">privacy policy.</Link></p>

      <button className='btn btn-primary font-normal text-xl'>Place order</button>
    </div>
  )
}

export default OrderSummary