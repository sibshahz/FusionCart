import React from 'react'
import Link from 'next/link'
import { RootState } from '@/src/redux/client-store'
import { useAppDispatch, useAppSelector } from '@/src/redux/client-hooks'
import { addToCart, deleteFromCart,setCartData } from '@/src/redux/features/client/cart/cartSlice'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { deleteCartItem, getAllCartItems } from '@/src/api/cart/cart'
import { Remove } from '@/src/utils/user/icons/icons'

type Props = {}

const CartDialog = (props: Props) => {
  const dispatch=useAppDispatch()
  const queryClient = useQueryClient();
  const cartProducts=useAppSelector((state:RootState) => state.cart.cartProducts);
  const userId=useAppSelector((state:RootState) => state.user._id);
  const subTotal=useAppSelector((state:RootState) => state.cart.subTotal)
  const {data,error,isLoading,refetch}=useQuery(['cart',userId],getAllCartItems);
  const { mutate:deleteMutate, isLoading:deleteLoading } = useMutation(deleteCartItem, {
    onSuccess: data => {
    dispatch(deleteFromCart(data));

  },
    onError: (error) => {
          console.log("there was an error: ",error)
  },
    onSettled: () => {
        queryClient.invalidateQueries('cart')
  }
  });
  const handleDelete=(id)=>{
    deleteMutate(id);
  }

  if(data){  
    dispatch(setCartData(data))
  }

  return (
    <div className='flex flex-col min-w-[417px] p-0 max-h-screen'>
      <div className='cart-header w-full text-left leading-normal py-6 px-6 border-b border-gray'>
        <h3 className="cart-heading text-black text-2xl font-semibold leading-normal">Shopping Cart</h3>
      </div>
      <div className='cart-content w-full max-h-[60vh] overflow-y-auto px-6 py-6'>
      <div className='cart-items-container flex flex-col gap-5 flex-grow-1 w-full'>
      {
        cartProducts?.map((cartItem,index) => {
          return(

                <div key={cartItem._id} className="cart-item-row flex flex-row gap-8 justify-between flex-grow-1 items-center">
                  <div className="cart-item-img">
                    <div className="avatar">
                      <div className="mask mask-squircle w-24 h-24">
                        <img src={`http://localhost:8080/${cartItem.product?.images[0].imagePath}`} 
                            alt={`http://localhost:8080/${cartItem.product?.images[0].imageAlt}`} />
                      </div>
                    </div>
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name font-poppins text-base font-normal leading-normal text-black">{cartItem.product.name}</div>
                    <div className="cart-item-price">
                      <span className=' font-poppins text-base font-light leading-normal text-black'>{cartItem.quantity}</span>
                       <span className='font-poppins text-xs font-normal leading-normal text-black mx-4'>X</span> 
                       <span className='font-poppins text-xs font-medium leading-normal text-golden'>Rs. {cartItem.product.salePrice}</span>
                    </div>
                  </div>
                  <div className="cart-item-del">
                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(cartItem._id)}> 
                      <img role='button' className="inline hover:cursor-pointer" src={Remove.src} alt="Remove item" />
                    </button>
                  </div>
                </div>
          )
        })
      }
      </div>
      </div>

      <div className="sub-total text-left mb-6 justify-self-start px-6 w-full">
        <span className='font-poppins text-base font-normal leading-normal text-black w-24 inline-block mr-24'>Subtotal: </span>
        <span className='font-poppins text-base font-semibold leading-normal text-golden'>Rs. {subTotal}</span>
      </div>
      <div className='cart-footer w-full border-t border-gray p-6 flex flex-row gap-3 justify-start'>

        <Link href="/shop/cart" className='text-xs font-normal leading-normal block border border-black rounded-full py-2 px-8'><span>Cart</span></Link>
        <Link href="/shop/checkout" className='text-xs font-normal leading-normal block border border-black rounded-full py-2 px-8'><span>Checkout</span></Link>
      </div>
    </div>
  )
}

export default CartDialog


