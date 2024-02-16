'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'
import Link from 'next/link'
import { useAppDispatch } from '@/src/redux/client-hooks'
import { resetCart } from '@/src/redux/features/client/cart/cartSlice'
type Props = {}

const PaymentCompletion = (props: Props) => {
  const searchParams = useSearchParams()
  const dispatch=useAppDispatch();
  const redirect_status = searchParams.get('redirect_status')
  const payment_intent_client_secret = searchParams.get('payment_intent_client_secret')
  const payment_intent = searchParams.get('payment_intent')
  console.log("🚀 ~ PaymentCompletion ~ payment_intent_client_secret:", payment_intent_client_secret)
  console.log("🚀 ~ PaymentCompletion ~ payment_intent:", payment_intent)
  console.log("🚀 ~ PaymentCompletion ~ redirect_status:", redirect_status)

  useEffect(() =>{
    if(redirect_status === 'succeeded'){
      // do something
      dispatch(resetCart())
    }
  },[])
  
  

  return (
    
    <div>
      <LayoutContainer bg='inherit'>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-bold mb-4">Payment Completion</h1>
          <div className="text-lg">
            {redirect_status === 'succeeded' && (
              <p>Your payment was successful. Thank you for shopping with us.</p>
            )}
            {redirect_status === 'failed' && (
              <p>Your payment was not successful. Please try again.</p>
            )}
          </div>
          <div className="link">
            <Link href="/shop">Continue shopping</Link>
          </div>
        </div>
      </LayoutContainer>
    </div>
  )
}

export default PaymentCompletion