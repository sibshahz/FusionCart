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

const ShopPage = () => {
  const queryClient = useQueryClient()

  // Queries
  const { data, error, isLoading, refetch }= useQuery('products', getProductsList)
  return (
    <>
    {
      isLoading ? ("Loading products...") : 

      error ? ("ERROR") : (
    
      <div className="flex gap-10">
        {
          data?.map((item:Product, index:number)=>{
            return(
              <ProductComponent {...item} key={item._id} />
            )
          })
        }
      </div>
      )}
    </>
  )
}

export default ShopPage