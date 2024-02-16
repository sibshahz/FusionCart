'use client'
import React, { useEffect } from 'react'

import { getOrders } from '@/src/api/orders/orders'
import { useAppSelector } from '@/src/redux/client-hooks'
import { RootState } from '@/src/redux/client-store'
import { useQuery, useQueryClient } from 'react-query'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'

type Props = {}

const OrdersPage = (props: Props) => {
  const queryClient = useQueryClient()

  const customerID=useAppSelector((state:RootState) => state.user._id);
  const { data, error, isLoading, refetch }= useQuery({queryKey:['orders',customerID], queryFn:() => getOrders(customerID || ""),enabled:false})
  useEffect(() => {
    refetch()
  },[])
  if(data){
    console.table("*** ORDERS ", data);
  }
  return (
    <div>
      <LayoutContainer bg='inherit'>

      </LayoutContainer>
    </div>
  )
}

export default OrdersPage