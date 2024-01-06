"use client"
import React from 'react'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProductsList
} from '@/src/api/products/products'
import Link from 'next/link'
import { Product } from '../../../../common/product/product.types'
import ProductComponent from '@/src/components/user/product/product.component'
import LayoutContainer from '@/src/components/user/layout-container/layout-container.component'

const ShopPage = () => {
  const queryClient = useQueryClient()

  // Queries
  const { data, error, isLoading, refetch }= useQuery('products', getProductsList)
  return (
    <>
    {
      isLoading ? ("Loading products...") : 

      error ? ("ERROR") : (
    
      <LayoutContainer bg='inherit'>
        {/* <div className='flex gap-8 flex-1 flex-wrap basis-6/12'> */}
        <div className='grid grid-cols-12 gap-8'>
        {
          data?.map((item:Product, index:number)=>{
            return(
              <ProductComponent {...item} key={item._id} />
            )
          })
        }
        </div>
      </LayoutContainer>
      )}
    </>
  )
}

export default ShopPage