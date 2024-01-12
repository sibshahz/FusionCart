'use client'
import React from 'react'
import { RootState } from '@/src/redux/client-store'
import { useAppDispatch, useAppSelector } from '@/src/redux/client-hooks'
import { addToCart, deleteFromCart,setCartData } from '@/src/redux/features/client/cart/cartSlice'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { deleteCartItem, getAllCartItems } from '@/src/api/cart/cart'
type Props = {}

const CartTable = (props: Props) => {
  const dispatch=useAppDispatch()
  const queryClient = useQueryClient();
  const cartProducts=useAppSelector((state:RootState) => state.cart.cartProducts);
  const userId=useAppSelector((state:RootState) => state.user._id);
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
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Subtotal</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        cartProducts?.map((cartItem,index) => {
          return(
            <tr key={cartItem.product._id+index}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={`http://localhost:8080/${cartItem.product?.images[0].imagePath}`} alt={`http://localhost:8080/${cartItem.product?.images[0].imageAlt}`} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{cartItem.product.name}</div>
                    <div className="text-sm opacity-50">{cartItem.product.tagline}</div>
                  </div>
                </div>
              </td>
              <td>
                {cartItem.product.salePrice}
              </td>
              <td>{cartItem.quantity}</td>
              <td>
                <div className="btn btn-ghost btn-xs">{cartItem.subTotal}</div>
              </td>
              <td>
                <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(cartItem._id)}>delete</button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
    {/* foot */}
    {/* <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot> */}
    
  </table>
</div>
  )
}

export default CartTable