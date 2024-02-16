'use client'
import React from 'react'
import { RootState } from '@/src/redux/client-store'
import { useAppDispatch, useAppSelector } from '@/src/redux/client-hooks'
import { addToCart, deleteFromCart,setCartData, updateCartItemQuantity } from '@/src/redux/features/client/cart/cartSlice'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { deleteCartItem, getAllCartItems, updateCartItem } from '@/src/api/cart/cart'
import { Delete, Remove } from '@/src/utils/user/icons/icons'
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

  const { mutate:updateMutate, isLoading:updateLoading } = useMutation(updateCartItem, {
    onSuccess: data => {
    // dispatch(deleteFromCart(data));
    console.log("SUCCESS", data);

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

  const handleChange=(cart)=>{
    dispatch(updateCartItemQuantity(cart));
    updateMutate(cart);
  }

  // if(data){  
  //   dispatch(setCartData(data))
  // }

  return (
    <div className="overflow-x-auto">
  <table className="table responsive">
    {/* head */}
    <thead className='bg-light-pink border-0 text-black text-base font-medium leading-normal text-center'>
      <tr className='border-0'>
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
            <tr key={cartItem.product._id+index} className='border-0 text-center'>
              <td className='w-max'>
                <div className="flex items-center gap-3 justify-around">
                  <div className="avatar">
                    <div className="mask mask-squircle w-24 h-24">
                      <img src={`http://localhost:8080/${cartItem.product?.images[0].imagePath}`} alt={`http://localhost:8080/${cartItem.product?.images[0].imageAlt}`} />
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-5 text-base font-normal leading-normal">{cartItem.product.name}</div>
                  </div>
                </div>
              </td>
              <td className='text-gray-5 text-base font-normal leading-normal'>
                {cartItem.product.salePrice}
              </td>
              <td>
                <div className="bg-white">
                <input 
                  onChange={(e) => handleChange({_id:cartItem._id,quantity:parseInt(e.target.value)})}
                  min="1" max="10" 
                  className="w-8 h-8 text-center bg-white border border-gray-5 rounded-md text-black text-base font-normal leading-normal" 
                  type="number" 
                  value={cartItem.quantity}
                    />
                </div>
              </td>
              <td className='text-black text-base font-normal leading-normal'>
                <div className="btn btn-ghost btn-xs text-base">Rs. {cartItem.subTotal}</div>
              </td>
              <td>
                <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(cartItem._id)}> 
                  <img role='button' className="inline hover:cursor-pointer" src={Delete.src} alt="Remove item" />
                </button>
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