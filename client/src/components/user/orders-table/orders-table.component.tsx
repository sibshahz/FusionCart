'use client'
import React from 'react'
import { RootState } from '@/src/redux/client-store'
import { useAppDispatch, useAppSelector } from '@/src/redux/client-hooks'
import { addToCart, deleteFromCart,setCartData, updateCartItemQuantity } from '@/src/redux/features/client/cart/cartSlice'
import { useQuery,useMutation, useQueryClient } from 'react-query'
import { deleteCartItem, getAllCartItems, updateCartItem } from '@/src/api/cart/cart'
import { Delete, Remove } from '@/src/utils/user/icons/icons'
import { getOrders } from '@/src/api/orders/orders'
import { Product } from '@/product/product.types'

type Props = {}

const OrdersTable = (props: Props) => {
  const dispatch=useAppDispatch()
  const queryClient = useQueryClient();
  const cartProducts=useAppSelector((state:RootState) => state.cart.cartProducts);
  const customerID=useAppSelector((state:RootState) => state.user._id);
  const { data, error, isLoading, refetch }= useQuery({queryKey:['orders',customerID], queryFn:() => getOrders(customerID || ""),enabled:false})

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


  return (
    <div className="overflow-x-auto">
  <table className="table responsive">
    {/* head */}
    <thead className='bg-light-pink border-0 text-black text-base font-medium leading-normal text-center'>
      <tr className='border-0'>
        <th>S. No</th>
        <th>Order #</th>
        <th>Products</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Status</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>
      {
        data?.data?.map((orderItem,index) => {
          return(
            <tr key={orderItem._id+index} className='border-0 text-center'>
              <td>{index}</td>
              <td className='w-max'>
                <div className="flex items-center gap-3 justify-around">
                  {orderItem._id}
                </div>
              </td>
              <td className='text-gray-5 text-base font-normal leading-normal'>
                {
                  // productsOrdered
                  orderItem.productsOrdered.map((product:Product,index) => {
                    <div key={index}>{product.name}</div>
                  })
                }
              </td>
              <td>
                ${orderItem.orderTotal.toFixed(2)}
              </td>
              <td className='text-black text-base font-normal leading-normal'>
                {
                   new Date(orderItem.orderDate).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  })
                } 
              </td>
              <td className='capitalize'>
                {orderItem.orderStatus}
              </td>
              <td className='capitalize'>
                {orderItem.paymentStatus}
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
</div>
  )
}

export default OrdersTable