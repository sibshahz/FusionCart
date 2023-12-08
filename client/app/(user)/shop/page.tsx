"use client"
import React from 'react'
import {
  useQuery,
  useQueryClient,
} from 'react-query'
import {
  getProducts
} from '@/src/api/products/products'
import Link from 'next/link'

const ShopPage = () => {
  const queryClient = useQueryClient()

  // Queries
  const { data, error, isLoading, refetch }= useQuery('products', getProducts)
  return (
    <>
    {
      isLoading ? ("Loading products...") : 

      error ? ("ERROR") : (
    
      <div className="flex gap-10">
        {
          data?.map((item, index:number)=>{
            return(
              <div className='' key={index}>
                <Link href={`/shop/${item._id}`}><span className='text-2xl text-red-accents'>{item.name}</span></Link>
                <p>{item.description}</p>
                <p>{item.price}</p>
              </div>
            )
          })
        }
      </div>
      )}
    </>
  )
}

export default ShopPage