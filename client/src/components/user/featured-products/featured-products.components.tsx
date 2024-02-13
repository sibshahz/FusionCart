import React, { useEffect } from 'react'
import LayoutContainer from '../layout-container/layout-container.component'
import { getProductsList } from '@/src/api/products/products'
import { useQueryClient, useQuery } from 'react-query'
import { Product } from '@/product/product.types'
import ProductComponent from '../product/product.component'

type Props = {}

const FeaturedProducts = (props: Props) => {

  const { data, error, isLoading, refetch }= useQuery({queryKey:'products', queryFn:getProductsList,enabled:false})
  useEffect(() => {
    refetch()
  },[])
  return (
    <section className='my-10 md:my-14'>
    <LayoutContainer bg='inherit'>
      <h2 className='text-gray-1 font-bold text-4xl capitalize text-center mb-8 md:mb-14'>Our products</h2>
      <div className='grid grid-cols-12 gap-8 grid-flow-row-dense'>
        {
          data?.map((item:Product, index:number)=>{
            return(
              <ProductComponent {...item} key={item._id} />
            )
          })
        }
        </div>
    </LayoutContainer>
    </section>
  )
}

export default FeaturedProducts